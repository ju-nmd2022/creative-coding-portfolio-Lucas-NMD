const size = 100;
const layers = 4;
const rows = 3;
const cols = 2;

let spacingX, spacingY;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  spacingX = width / (cols + 2);
  spacingY = height / (rows + 2);
}

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 34;
  noFill();
  for (let i = 0; i < layers; i++) {
    strokeWeight(6);
    const s = (size / layers) * i;
    const half = s / 2;
    beginShape();
    vertex(getRandomValue(x - half, variance), getRandomValue(y - half, variance));
    vertex(getRandomValue(x + half, variance), getRandomValue(y - half, variance));
    vertex(getRandomValue(x + half, variance), getRandomValue(y + half, variance));
    vertex(getRandomValue(x - half, variance), getRandomValue(y + half, variance));
    endShape(CLOSE);
  }
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = spacingX * (i + 1);
      const y = spacingY * (j + 1);
      drawLayers(x, y, size, layers);
    }
  }
  noLoop();
}