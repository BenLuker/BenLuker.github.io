// Particle Animation code from: https://p5js.org/examples/simulate-particles.html

let parentID = 'animatedCanvas';
let particleDensity = 25;
let connectionRange = 100;
let particles = [];

function setup() {
    pixelDensity(1);
    var parentDiv = document.getElementById(parentID);
    var width = parentDiv.offsetWidth;
    var canvas = createCanvas(windowWidth,windowHeight * 0.8);
    canvas.parent(parentID);
    canvas.id("landingCanvas");

    for (let i = 0; i <  (width * height) * (particleDensity / 100000); i++) {
        particles.push(new Particle());
    }
}

function windowResized() {
    var parentDiv = document.getElementById(parentID);
    var width = parentDiv.offsetWidth;
    resizeCanvas(windowWidth,windowHeight * 0.8);
}

function draw() {
    background('#17191a');
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
        fill('rgba(200,169,169,0.5)');
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
            stroke('rgba(255,255,255,0.04)');
            line(this.x,this.y,element.x,element.y);
          }
        });
      }
    }
