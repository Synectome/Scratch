// generated by chat gpt on march 23rd
// goal is to have an example on how to determine when a given point is within the bounds of a shape
// prompt was: in p5js write a sketch where there are random dots across the canvas. also a circle bounces across the canvas, and when that circle surrounds any of the 'random dots' on the canvas, those dots change color to red.
// originally - just a moving circle that changed dots colours
let dots = [];
let circle;
const SPEEDLIMIT = 7;
const BOUNDX = 600;
const BOUNDY = 400;

function setup() {
  createCanvas(BOUNDX, BOUNDY);
  
  // Generate random dots
  for (let i = 0; i < 50; i++) {
    dots.push(new Dot(random(width), random(height)));
  }

  // Initialize bouncing circle
  circle = new BouncingCircle(width / 2, height / 2, 50, random(2, 4), random(2, 4));
}

function draw() {
  background(220);
  
  // Update and draw bouncing circle
  circle.update();
  circle.display();

  // Update and draw dots
  for (let dot of dots) {
    // Check if dot is inside the circle
    dot.checkCollision(circle);
    dot.display();
  }
}

// Class for dots
class Dot {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.color = color(0); // Default color black
  }

  checkCollision(circle) {
    let d = dist(this.pos.x, this.pos.y, circle.pos.x, circle.pos.y);
    if (d < circle.radius) {
      this.color = color(255, 0, 0); // Change to red if inside the circle
    } else {
      this.color = color(0);
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 8, 8);
  }
}

// Class for bouncing circle
class BouncingCircle {
  constructor(x, y, radius, speedX, speedY) {
    this.pos = createVector(x, y);
    this.vel = createVector(speedX, speedY);
    this.radius = radius;
  }

  update() {
    this.pos.add(this.vel);

    // Mouse speed limits
    let mouse_speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    if (mouse_speed > SPEEDLIMIT){
      mouse_speed = SPEEDLIMIT;
    } else if (mouse_speed < -SPEEDLIMIT){
      mouse_speed = -SPEEDLIMIT;
    }

    // Old square style interesection of quadrands
    // let left = this.pos.x - this.radius < mouseX && mouseX < this.pos.x;
    // let right = this.pos.x + this.radius > mouseX && mouseX > this.pos.x;
    // let top = this.pos.y + this.radius > mouseY && mouseY > this.pos.y;
    // let bottom = this.pos.y - this.radius < mouseY && mouseY < this.pos.y;
    // if (top && left){
    //   this.vel.x += mouse_speed;
    //   this.vel.y -= mouse_speed;
    // } else if (top && right) {
    //   this.vel.x -= mouse_speed;
    //   this.vel.y += mouse_speed;
    // } else if (bottom && left) {
    //   this.vel.x += mouse_speed;
    //   this.vel.y += mouse_speed;
    // } else if (bottom && right) {
    //   this.vel.x -= mouse_speed;
    //   this.vel.y -= mouse_speed;
    // }

    // ### new circular quadrant intersections
    // Calculate relative mouse position to the circle center
    let relX = mouseX - this.pos.x;
    let relY = mouseY - this.pos.y;

    // Check if the mouse is inside the circle
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);

    if (d < this.radius) { // Mouse is inside the circle
      if (relX >= 0 && relY < 0) { 
        // view bottom left - direction incorrect
        console.log('top right\nthis.vel.x += mouse_speed;\nthis.vel.y -= mouse_speed;');
        this.vel.x -= mouse_speed;
        this.vel.y += mouse_speed;
      } else if (relX < 0 && relY < 0) { 
        console.log('top left \nthis.vel.x += mouse_speed;\nthis.vel.y += mouse_speed;');
        this.vel.x += mouse_speed;
        this.vel.y += mouse_speed;
      } else if (relX < 0 && relY >= 0) { 
        // top left direction must be okay...
        console.log('bottom left \nthis.vel.x -= mouse_speed;\nthis.vel.y -= mouse_speed;');
        this.vel.x += mouse_speed;
        this.vel.y -= mouse_speed;
      } else { 
        // view bottom right - direction seems okay
        console.log('bottom right \nthis.vel.x -= mouse_speed;\nthis.vel.y -= mouse_speed;');
        this.vel.x -= mouse_speed;
        this.vel.y -= mouse_speed;
      }
    }


    // enforcing speed limits
    if (this.vel.y > SPEEDLIMIT){
      this.vel.y = SPEEDLIMIT;
    } else if (this.vel.y < -SPEEDLIMIT){
      this.vel.y = -SPEEDLIMIT;
    }
    if (this.vel.x > SPEEDLIMIT){
      this.vel.x = SPEEDLIMIT;
    } else if (this.vel.y < -SPEEDLIMIT){
      this.vel.x = -SPEEDLIMIT;
    }

    // Bounce off walls
    if (this.pos.x - this.radius < 0) {
      this.vel.x *= -0.9;
      this.pos.x = 1 + this.radius;
    } else if (this.pos.x + this.radius > width){
      this.vel.x *= -0.9;
      this.pos.x = BOUNDX - 1 - this.radius;
    }
    if (this.pos.y - this.radius < 0) {
      this.vel.y *= -0.9;
      this.pos.y = 1 + this.radius;
    } else if (this.pos.y + this.radius > height){
      this.vel.y *= -0.9;
      this.pos.y = BOUNDY - 1 - this.radius;
    }

    // faux gravity
    this.vel.y += 0.1;



  }

  display() {
    fill(0, 100, 255, 100);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
  }
}
