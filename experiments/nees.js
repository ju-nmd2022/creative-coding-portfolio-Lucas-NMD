function setup() {
    createCanvas(800, 800);
    background(255);
    noLoop();
  }
  
  function draw() {
    let cols = 10;
    let rows = 10;
    let gridSize = width / cols;
    let maxRotation = PI / 4;
    let maxOffset = gridSize * 0.4;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x = col * gridSize + gridSize / 2;
        let y = row * gridSize + gridSize / 2;
  
        let randomnessFactor = map(row, 0, rows - 1, 0, 1);
        
        let rotation = randomnessFactor * random(-maxRotation, maxRotation);
        
        let offsetX = randomnessFactor * random(-maxOffset, maxOffset);
        let offsetY = randomnessFactor * random(-maxOffset, maxOffset);

        let sizeVariation = randomnessFactor * random(-gridSize * 0.3, gridSize * 0.3);
  
        push();
        translate(x + offsetX, y + offsetY);
        rotate(rotation);
        rectMode(CENTER);
        stroke(0);
        fill(255);
        rect(0, 0, gridSize - sizeVariation, gridSize - sizeVariation);
        pop();
      }
    }
  }
  