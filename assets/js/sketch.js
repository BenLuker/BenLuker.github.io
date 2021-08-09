// Particle Animation code from: https://p5js.org/examples/simulate-particles.html

// Parameters
let particleDensity = 25;
let connectionRange = 100;
let fadeInTime = 1;

let parentID = 'animatedBackground';
let footerID = 'footer';
let particles = [];
let opacity;
let frameOne = true;

function setup() {
  pixelDensity(1);
  let footerDiv = document.getElementById(footerID);
  let height = footerDiv.offsetTop - footerDiv.offsetHeight - 32;
  let canvas = createCanvas(document.body.scrollWidth,height);
  canvas.parent(parentID);
  canvas.id("landingCanvas");

  for (let i = 0; i < (width * height) * (particleDensity / 100000); i++) {
      particles.push(new Particle());
  }
}

function windowResized() {
  setCanvasSize()
}

function setCanvasSize() {
  let footerDiv = document.getElementById(footerID);
  let height = footerDiv.offsetTop - footerDiv.offsetHeight - 32;
  resizeCanvas(document.body.scrollWidth,height);
}

function draw() {
  if (frameOne) {
    setCanvasSize()
    frameOne = false;
  }

  let footerDiv = document.getElementById(footerID);
  let height = footerDiv.offsetTop - footerDiv.offsetHeight - 32;
  console.log(height);

    background('#17191a');
    opacity = min((millis() / (1000 * fadeInTime)), 1); 
    for(let i = 0;i<particles.length;i++) {
      particles[i].createParticle();
      particles[i].moveParticle();
      particles[i].joinParticles(particles.slice(i));
    }
}

// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
      constructor(){
        this.x = random(0,width);
        this.y = random(0,height);
        this.r = random(1,8);
        this.xSpeed = random(-2,2);
        this.ySpeed = random(-1,1.5);
      }
    
    // creation of a particle.
      createParticle() {
        noStroke();
        fill(200,169,169,128 * opacity);
        circle(this.x,this.y,this.r);
      }
    
    // setting the particle in motion.
      moveParticle() {
        if(this.x < 0 || this.x > width)
          this.xSpeed*=-1;
        if(this.y < 0 || this.y > height)
          this.ySpeed*=-1;
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    
    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
      joinParticles(particles) {
        particles.forEach(element =>{
          let dis = dist(this.x,this.y,element.x,element.y);
          if(dis<connectionRange) {
            stroke(255,255,255,10 * opacity);
            line(this.x,this.y,element.x,element.y);
          }
        });
      }
    }
