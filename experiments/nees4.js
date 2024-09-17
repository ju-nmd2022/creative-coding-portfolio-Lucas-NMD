let gridSize = 40;
let maxHeight = 200;
let cubeSize = 30;  

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);  
  noLoop();  
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 1000);  
  background(255);  
}

function draw() {
  rotateX(PI / 6);
  rotateY(PI / 4);
  
  for (let x = -width / 2; x < width / 2; x += gridSize) {
    for (let y = -height / 2; y < height / 2; y += gridSize) {
      push();
      translate(x, y);
      
      let h = random(10, maxHeight);
      
      drawCuboid(0, 0, h, cubeSize, cubeSize);
      pop();
    }
  }
}

function drawCuboid(x, y, h, w, d) {
  fill(200);  
  stroke(0); 
  strokeWeight(1);
  
  translate(x, y, -h / 2);
  
  box(w, d, h);
}
