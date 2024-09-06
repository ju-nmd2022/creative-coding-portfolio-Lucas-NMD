function setup() {
    createCanvas(800, 800);
    background(255);
    noLoop();
  }
  
  function draw() {
    let cols = int(random(5, 15));
    let rows = int(random(5, 15));
    let gridWidth = width / cols;
    let gridHeight = height / rows;
    let maxRotation = PI / 4;
    let maxOffset = min(gridWidth, gridHeight) * 0.4;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x = col * gridWidth + gridWidth / 2;
        let y = row * gridHeight + gridHeight / 2;
  
        let randomnessFactor = map(row, 0, rows - 1, 0, 1);
        
        let rotation = randomnessFactor * random(-maxRotation, maxRotation);
        
        let offsetX = randomnessFactor * random(-maxOffset, maxOffset);
        let offsetY = randomnessFactor * random(-maxOffset, maxOffset);

        let sizeVariation = randomnessFactor * random(-min(gridWidth, gridHeight) * 0.3, min(gridWidth, gridHeight) * 0.3);
  
        let r = map(randomnessFactor, 0, 1, 100, 255);
        let g = map(randomnessFactor, 0, 1, 200, 50);
        let b = map(randomnessFactor, 0, 1, 150, 200);
  
        push();
        translate(x + offsetX, y + offsetY);
        rotate(rotation);
        fill(r, g, b);
        noStroke();
        drawRandomShape(0, 0, gridWidth - sizeVariation, gridHeight - sizeVariation); // Random shape
        pop();
      }
    }
  }
  
  function drawRandomShape(x, y, w, h) {
    let shapeType = int(random(3));

    if (shapeType === 0) {
      rectMode(CENTER);
      rect(x, y, w, h);
    } else if (shapeType === 1) {
      ellipse(x, y, w, h);
    } else if (shapeType === 2) {
      let halfW = w / 2;
      let halfH = h / 2;
      triangle(
        x - halfW, y + halfH,
        x + halfW, y + halfH,
        x, y - halfH       
      );
    }
  }
  