function setup() {
  createCanvas(800, 800);
  frameRate(5);
}

class Cell {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.newState = -1;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = [
      color(255, 255, 255),
      color(255, 0, 0),
      color(0, 0, 255),
      color(255, 255, 0),
      color(0, 0, 0) 
    ];
    return colors[Math.floor(random(colors.length))];
  }

  toggleState() {
    this.state = 1 - this.state;
    this.color = this.getRandomColor();
  }

  draw(size) {
    fill(this.color);
    rect(this.x * size, this.y * size, size, size);
  }
}

let board = [];
let size = 40; 
let boardSize = 20;

function setupGrid() {
  for (let i = 0; i < boardSize; i++) {
    board.push([]);
    for (let j = 0; j < boardSize; j++) {
      let state = Math.round(Math.random());
      let cell = new Cell(i, j, state);
      board[i].push(cell);
    }
  }
}

function drawMondrianGrid() {
  stroke(0);
  strokeWeight(8);
  for (let i = 0; i <= boardSize; i++) {
    line(i * size, 0, i * size, height);
    line(0, i * size, width, i * size);
  }
}

function draw() {
  background(255);
  noStroke();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].draw(size);
    }
  }

  drawMondrianGrid();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      calculateNewState(i, j);
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].state = board[i][j].newState;
    }
  }
}

function calculateNewState(x, y) {
  let liveNeighbors = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      let ni = (x + i + boardSize) % boardSize;
      let nj = (y + j + boardSize) % boardSize;
      liveNeighbors += board[ni][nj].state;
    }
  }

  if (board[x][y].state === 1) { 
    if (liveNeighbors < 2 || liveNeighbors > 3) {
      board[x][y].newState = 0;
    } else {
      board[x][y].newState = 1;
    }
  } else {  
    if (liveNeighbors === 3) {
      board[x][y].newState = 1;  
      board[x][y].color = board[x][y].getRandomColor();  
    } else {
      board[x][y].newState = 0;  
    }
  }
}

function mousePressed() {
  let i = Math.floor(mouseX / size);
  let j = Math.floor(mouseY / size);

  if (i >= 0 && i < boardSize && j >= 0 && j < boardSize) {
    board[i][j].toggleState();  
    redraw(); 
  }
}

setupGrid();
