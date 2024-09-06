let fireworks = [];
let gravity;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(RGB);
  gravity = createVector(0, 0.2);
  background(0);
}

function draw() {
  background(0, 25);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].isDone()) {
      fireworks.splice(i, 1);
    }
  }

  if (random(1) < 0.05) {
    fireworks.push(new Firework());
  }
}

class Firework {
  constructor() {
    this.particle = new Particle(random(width), height, true);
    this.exploded = false;
    this.particles = [];
  }

  update() {
    if (!this.exploded) {
      this.particle.applyForce(gravity);
      this.particle.update();

      if (this.particle.vel.y >= 0) {
        this.explode();
        this.exploded = true;
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].isFaded()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      let angle = random(TWO_PI);
      let speed = random(2, 6);
      let vx = cos(angle) * speed;
      let vy = sin(angle) * speed;
      let p = new Particle(
        this.particle.pos.x,
        this.particle.pos.y,
        false,
        vx,
        vy
      );
      this.particles.push(p);
    }
  }

  display() {
    if (!this.exploded) {
      this.particle.display();
    }
    for (let p of this.particles) {
      p.display();
    }
  }

  isDone() {
    return this.exploded && this.particles.length === 0;
  }
}

class Particle {
  constructor(x, y, isLaunch, vx = random(-1, 1), vy = random(-12, -8)) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.size = random(4, 8);
    this.color = this.getRandomMondrianColor();
    this.lifespan = 255;
    this.isLaunch = isLaunch;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (!this.isLaunch) {
      this.lifespan -= 4;
    }
  }

  getRandomMondrianColor() {
    const mondrianColors = [
      color(255, 255, 255),
      color(255, 0, 0),
      color(0, 0, 255),
      color(255, 255, 0),
      color(0, 0, 0),
    ];
    return mondrianColors[floor(random(mondrianColors.length))];
  }

  display() {
    noStroke();
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.lifespan
    );
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isFaded() {
    return this.lifespan <= 0;
  }
}
