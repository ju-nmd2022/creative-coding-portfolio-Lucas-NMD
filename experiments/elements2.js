let particles = [];
let backgroundImage;
let raindropTexture;

function preload() {
  backgroundImage = loadImage('pexels-gabriela-palai-129458-395196.jpg');
  raindropTexture = loadImage('pngwing.com.png');  
}

function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  
  let p = new Particle(createVector(random(width), 0));  
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
    this.vel = createVector(random(-1, 1), random(5, 10));  
    this.acc = createVector(0, 0);
    this.lifespan = 255;
    this.size = random(1, 8);  
  }
  
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    let gravity = createVector(0, 0.2);
    this.applyForce(gravity);
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);
  }

  isFinished() {
    return this.pos.y > height;
  }

  show() {
    tint(255, this.lifespan); 
    image(raindropTexture, this.pos.x, this.pos.y, this.size, this.size); 
  }
}
