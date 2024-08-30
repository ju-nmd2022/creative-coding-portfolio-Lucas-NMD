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
  noStroke();
  fill(0);
}

function drawNoiseEllipse(x, y, noiseScale) {
  const noiseValue = noise(x * noiseScale, y * noiseScale);
  const size = 4 + noiseValue * 8;
  ellipse(x, y, size);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 3;
  const noiseScale = 0.5;
  const stepSize = 9; 
  for (let i = 0; i < layers; i++) {
    const s = (size / layers) * i;
    const half = s / 2;

    for (let px = x - half; px <= x + half; px += stepSize) {
      drawNoiseEllipse(px, y - half, noiseScale);
      drawNoiseEllipse(px, y + half, noiseScale);
    }
    
    for (let py = y - half; py <= y + half; py += stepSize) {
      drawNoiseEllipse(x - half, py, noiseScale);
      drawNoiseEllipse(x + half, py, noiseScale);
    }
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
