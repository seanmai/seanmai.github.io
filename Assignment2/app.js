window.addEventListener('load', main);

function prepare_dom(g) {
  const grid = document.querySelector(".grid");
  const nCells = 16 * 16 ; // max grid size
  for( let i = 0 ; i < nCells ; i ++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.setAttribute("data-cellInd", i);
    cell.addEventListener("click", () => {
      cell_click_cb(g, cell, i);
    });
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      cell_right_click_cb(g, cell, i);
    }, false);

    let pressTimer;
    cell.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      pressTimer = window.setTimeout(() => {
        cell_right_click_cb(g, cell, i)
      }, 750);
    }, false);
    cell.addEventListener("mouseup", (e) => {
      clearTimeout(pressTimer);
    });
    grid.appendChild(cell);
  }
}

function render(g) {
  const grid = document.querySelector(".grid");
  grid.style.gridTemplateColumns = `repeat(${g.ncols}, 1fr)`;
  for(let i = 0 ; i < grid.children.length ; i++) {
    const cell = grid.children[i];
    const ind = Number(cell.getAttribute("data-cellInd"));
    if( ind >= g.nrows * g.ncols) {
      cell.style.display = "none";
    }
    else {
      cell.style.display = "block";
      const col = ind % g.ncols;
      const row = Math.floor(ind / g.nrows);
      const gameCell = g.arr[row][col];
      if(gameCell.state === "hidden"){
        cell.className = '';
        cell.classList.add("cell");
      }else if(gameCell.state === "marked")
        cell.classList.add("marked");
      else if(gameCell.mine)
        cell.classList.add("mine");
      else if(gameCell.state === "shown" && gameCell.count.toString() !== "0") {
        const cellClass = "adjacent-" + gameCell.count.toString();
        cell.classList.add(cellClass);
      } else
        cell.classList.add("shown");
    }
  }
}

function cell_click_cb(g, cell_div, ind) {
  const col = ind % g.ncols;
  const row = Math.floor(ind / g.ncols);
  g.uncover(row, col);
  render(g);

  if(!g.timer)
    start_timer(g);

  if(g.exploded) {
    document.querySelector("#overlay").classList.toggle("active");
    document.querySelector("#overlay-lose").style.display = "flex";
    stop_timer(g);
  }
  else if (g.getStatus().done === true){
    document.querySelector(".game-time").textContent = g.t;
    document.querySelector("#overlay").classList.toggle("active");
    document.querySelector("#overlay-win").style.display = "flex";
    stop_timer(g);
  }
}

function cell_right_click_cb(g, cell_div, ind) {
  const col = ind % g.ncols;
  const row = Math.floor(ind / g.ncols);
  cell_div.classList.toggle("marked");
  g.mark(row, col);
  render(g);

  document.querySelector("#remaining").textContent = g.nmines - g.nmarked;
}

function button_cb(g, cols, rows, mines) {
  stop_timer(g);
  document.getElementById("timer").textContent = '000';
  document.querySelector("#remaining").textContent = mines
  g.init(rows, cols, mines);
  render(g);
}

function start_timer(g) {
  g.timer = setInterval(function(){
    g.t++;
    document.getElementById("timer").innerHTML = ('000' + g.t).substr(-3);
  }, 1000);
}

function stop_timer(g){
   if(g.timer) window.clearInterval(g.timer);
}

function main() {
  let game = new MSGame();
  document.querySelectorAll(".difficultyButton").forEach((button) =>{
    [rows,cols,mines] = button.getAttribute("data-size").split("x").map(s=>Number(s));
    button.addEventListener("click", button_cb.bind(null, game, cols, rows, mines));
  });

  document.querySelector("#overlay").addEventListener("click", () => {
    document.querySelector("#overlay").classList.remove("active");
    document.querySelector("#overlay-win").style.display = "none";
    document.querySelector("#overlay-lose").style.display = "none";
    r = game.nrows;
    c = game.ncols;
    m = game.nmines;
    button_cb(game, r, c, m);
  });

  prepare_dom(game);
  button_cb(game, 8, 8, 10);
}

let MSGame = (function(){

  // private constants
  const STATE_HIDDEN = "hidden";
  const STATE_SHOWN = "shown";
  const STATE_MARKED = "marked";

  function array2d( nrows, ncols, val) {
    const res = [];
    for( let row = 0 ; row < nrows ; row ++) {
      res[row] = [];
      for( let col = 0 ; col < ncols ; col ++)
        res[row][col] = val(row,col);
    }
    return res;
  }

  // returns random integer in range [min, max]
  function rndInt(min, max) {
    [min,max] = [Math.ceil(min), Math.floor(max)]
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  class _MSGame {
    constructor() {
      this.init(8,8,10); // easy
    }

    validCoord(row, col) {
      return row >= 0 && row < this.nrows && col >= 0 && col < this.ncols;
    }

    init(nrows, ncols, nmines) {
      this.nrows = nrows;
      this.ncols = ncols;
      this.nmines = nmines;
      this.nmarked = 0;
      this.nuncovered = 0;
      this.exploded = false;
      this.t = 0;
      this.timer = null;
      // create an array
      this.arr = array2d(
        nrows, ncols,
        () => ({mine: false, state: STATE_HIDDEN, count: 0}));
    }

    count(row,col) {
      const c = (r,c) =>
            (this.validCoord(r,c) && this.arr[r][c].mine ? 1 : 0);
      let res = 0;
      for( let dr = -1 ; dr <= 1 ; dr ++ )
        for( let dc = -1 ; dc <= 1 ; dc ++ )
          res += c(row+dr,col+dc);
      return res;
    }
    sprinkleMines(row, col) {
        // prepare a list of allowed coordinates for mine placement
      let allowed = [];
      for(let r = 0 ; r < this.nrows ; r ++ ) {
        for( let c = 0 ; c < this.ncols ; c ++ ) {
          if(Math.abs(row-r) > 2 || Math.abs(col-c) > 2)
            allowed.push([r,c]);
        }
      }
      this.nmines = Math.min(this.nmines, allowed.length);
      for( let i = 0 ; i < this.nmines ; i ++ ) {
        let j = rndInt(i, allowed.length-1);
        [allowed[i], allowed[j]] = [allowed[j], allowed[i]];
        let [r,c] = allowed[i];
        this.arr[r][c].mine = true;
      }
      // erase any marks (in case user placed them) and update counts
      for(let r = 0 ; r < this.nrows ; r ++ ) {
        for( let c = 0 ; c < this.ncols ; c ++ ) {
          if(this.arr[r][c].state == STATE_MARKED)
            this.arr[r][c].state = STATE_HIDDEN;
          this.arr[r][c].count = this.count(r,c);
        }
      }
      let mines = []; let counts = [];
      for(let row = 0 ; row < this.nrows ; row ++ ) {
        let s = "";
        for( let col = 0 ; col < this.ncols ; col ++ ) {
          s += this.arr[row][col].mine ? "B" : ".";
        }
        s += "  |  ";
        for( let col = 0 ; col < this.ncols ; col ++ ) {
          s += this.arr[row][col].count.toString();
        }
        mines[row] = s;
      }
      console.log("Mines and counts after sprinkling:");
      console.log(mines.join("\n"), "\n");
    }
    // uncovers a cell at a given coordinate
    // this is the 'left-click' functionality
    uncover(row, col) {
      console.log("uncover", row, col);
      // if coordinates invalid, refuse this request
      if( ! this.validCoord(row,col)) return false;
      // if this is the very first move, populate the mines, but make
      // sure the current cell does not get a mine
      if( this.nuncovered === 0)
        this.sprinkleMines(row, col);
      // if cell is not hidden, ignore this move
      if( this.arr[row][col].state !== STATE_HIDDEN) return false;
      // floodfill all 0-count cells
      const ff = (r,c) => {
        if( ! this.validCoord(r,c)) return;
        if( this.arr[r][c].state !== STATE_HIDDEN) return;
        this.arr[r][c].state = STATE_SHOWN;
        this.nuncovered ++;
        if( this.arr[r][c].count !== 0) return;
        ff(r-1,c-1);ff(r-1,c);ff(r-1,c+1);
        ff(r  ,c-1);         ;ff(r  ,c+1);
        ff(r+1,c-1);ff(r+1,c);ff(r+1,c+1);
      };
      ff(row,col);
      // have we hit a mine?
      if( this.arr[row][col].mine) {
        this.exploded = true;
      }
      return true;
    }
    // puts a flag on a cell
    // this is the 'right-click' or 'long-tap' functionality
    mark(row, col) {
      console.log("mark", row, col);
      // if coordinates invalid, refuse this request
      if( ! this.validCoord(row,col)) return false;
      // if cell already uncovered, refuse this
      console.log("marking previous state=", this.arr[row][col].state);
      if( this.arr[row][col].state === STATE_SHOWN) return false;
      // accept the move and flip the marked status
      this.nmarked += this.arr[row][col].state == STATE_MARKED ? -1 : 1;
      this.arr[row][col].state = this.arr[row][col].state == STATE_MARKED ?
        STATE_HIDDEN : STATE_MARKED;
      return true;
    }
    // returns array of strings representing the rendering of the board
    //      "H" = hidden cell - no bomb
    //      "F" = hidden cell with a mark / flag
    //      "M" = uncovered mine (game should be over now)
    // '0'..'9' = number of mines in adjacent cells
    getRendering() {
      const res = [];
      for( let row = 0 ; row < this.nrows ; row ++) {
        let s = "";
        for( let col = 0 ; col < this.ncols ; col ++ ) {
          let a = this.arr[row][col];
          if( this.exploded && a.mine) s += "M";
          else if( a.state === STATE_HIDDEN) s += "H";
          else if( a.state === STATE_MARKED) s += "F";
          else if( a.mine) s += "M";
          else s += a.count.toString();
        }
        res[row] = s;
      }
      return res;
    }
    getStatus() {
      let done = this.exploded ||
          this.nuncovered === this.nrows * this.ncols - this.nmines;
      return {
        done: done,
        exploded: this.exploded,
        nrows: this.nrows,
        ncols: this.ncols,
        nmarked: this.nmarked,
        nuncovered: this.nuncovered,
        nmines: this.nmines,
        timer: this.timer
      }
    }
  }

  return _MSGame;

})();
