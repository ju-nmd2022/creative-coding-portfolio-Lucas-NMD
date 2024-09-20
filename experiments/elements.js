let particles = [];
let fireTexture;

function preload() {
  fireTexture = loadImage('https://ju-nmd2022.github.io/creative-coding-portfolio-Lucas-NMD/experiments/pngegg.png');
  blendMode(ADD);
}

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(0);
  
  let startX = random(width);
  let p = new Particle(createVector(startX, height));
  particles.push(p);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();
    
    if (p.isFinished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(position) {
    this.pos = position.copy();
    
    this.vel = createVector(random(-2, 2), random(-5, -2));
    this.acc = createVector(0, 0);
    this.lifespan = 255;
    this.size = random(90, 300);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    let wind = createVector(random(-0.1, 0.1), 0);  
    this.applyForce(wind);
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);
    
    this.lifespan -= 3;  
    this.size *= 0.97;  
  }

  isFinished() {
    return this.lifespan < 0 || this.size < 1;
  }

  show() {
    let r = map(this.lifespan, 0, 255, 255, 255);
    let g = map(this.lifespan, 0, 255, 50, 200);
    let b = map(this.lifespan, 0, 255, 0, 50);
    tint(r, g, b, this.lifespan);  
    
    image(fireTexture, this.pos.x, this.pos.y, this.size, this.size);
  }
}
