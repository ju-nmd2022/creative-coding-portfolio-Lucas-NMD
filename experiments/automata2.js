let cols, rows;
let flowfield; 
let scl = 40;
let zoff = 0; 
let colors = [];
let boardSize = 20;

function setup() {
  createCanvas(800, 800);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  
  setupMondrianColors();
}

function setupMondrianColors() {
  
  for (let i = 0; i < cols; i++) {
    colors[i] = [];
    for (let j = 0; j < rows; j++) {
      colors[i][j] = getRandomMondrianColor();
    }
  }
}

function getRandomMondrianColor() {
  const mondrianColors = [
    color(255, 255, 255),
    color(255, 0, 0),    
    color(0, 0, 255),    
    color(255, 255, 0),  
    color(0, 0, 0)       
  ];
  return mondrianColors[floor(random(mondrianColors.length))];
}

function draw() {
  background(255);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1); 
      flowfield[index] = v;
      xoff += 0.1;

      
      let xPos = x * scl;
      let yPos = y * scl;
      let currentColor = colors[x][y];
      
      fill(currentColor);
      noStroke();
      rect(xPos, yPos, scl, scl);

      let nextColorIndex = (floor(noise(xoff, yoff, zoff) * 5)) % 5;
      colors[x][y] = lerpColor(currentColor, getRandomMondrianColor(), 0.01);
    }
    yoff += 0.1;
  }
  zoff += 0.01;
  
  drawMondrianGrid();
}

function drawMondrianGrid() {
  stroke(0);
  strokeWeight(8);
  for (let i = 0; i <= cols; i++) {
    line(i * scl, 0, i * scl, height);
    line(0, i * scl, width, i * scl); 
  }
}

function mousePressed() {
  let i = floor(mouseX / scl);
  let j = floor(mouseY / scl);

  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    colors[i][j] = getRandomMondrianColor();  
  }
}
