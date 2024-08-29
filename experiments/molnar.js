function setup() {
    createCanvas(500, 500);
  }
  
  const size = 100;
  const layers = 4;
  const rows = 3;
  const cols = 2;
  const spacingX = width / (cols + 2);
  const spacingY = height / (rows + 2);
  
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
      vertex(
        getRandomValue(x - half, variance),
        getRandomValue(y - half, variance)
      );
      vertex(
        getRandomValue(x + half, variance),
        getRandomValue(y - half, variance)
      );
      vertex(
        getRandomValue(x + half, variance),
        getRandomValue(y + half, variance)
      );
      vertex(
        getRandomValue(x - half, variance),
        getRandomValue(y + half, variance)
      );
      endShape(CLOSE);
    }
  }
  
  function draw() {
    background(255);
  
    
  
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        drawLayers(
          spacingX * (x + 1),
          spacingY * (y + 1),
          size,
          layers
        );
      }
    }
  
    noLoop();
  }
  /* Adapted from Garrit's molnar example. */