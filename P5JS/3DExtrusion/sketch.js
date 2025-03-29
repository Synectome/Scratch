// making cubes from 6 planes, March 29th 2025
// Jesse Bourret-Gheysen

const CANVASX = 600;
const CANVASY = 600;
let cubes = [];

function setup() {
  createCanvas(CANVASX, CANVASY, WEBGL);
  generateCubes(1, [10, 50], ['#FF5733', '#33FF57', '#3357FF', '#F3FF33']);
}

function draw() {
  background(20);

  orbitControl(); // Enables mouse-controlled orbiting
  rotateY(frameCount * 0.005); // Slow rotation for effect

  for (let cube of cubes) {
    push();
    fill(cube.color);
    translate(cube.x, cube.y, cube.z);
    // box(cube.size);
    draw_cube(cube);
    pop();
  }
  noLoop();
}



function extrusion(value){
  applyMatrix(1, value/100, 0, 0,   // X-axis skew
              0, 1, value/100, 0,   // Y-axis normal
              0, 0, 1, value/100,   // Z-axis normal
              0, 0, 0, 1);  // No translation
}

function keyPressed() {
  if (key === 'a') {
    console.log("a Pressed!");
    extrusion(frameCount%CANVASX);
  }else if (key === 'd') {
    console.log("d Pressed!");
  }

  if (key === 'w') {
    console.log("w Pressed!");
  }else if (key === 's') {
    console.log("s Pressed!");
  }

  if (key === 'q') {
    console.log("q Pressed!");
  }else if (key === 'e') {
    console.log("e Pressed!");
  }
}

function mousePressed(){
  if (mouseButton === LEFT) {
    console.log("Left Click at", mouseX, mouseY);
    extrusion(frameCount%CANVASX);
  } else if (mouseButton === RIGHT) {
    console.log("Right Click at", mouseX, mouseY);
  } else if (mouseButton === CENTER) {
    // wibe cube list, and reenstate
    console.log("Middle Click at", mouseX, mouseY);
    cubes = [];
    generateCubes(50, [10, 50], ['#FF5733', '#33FF57', '#3357FF', '#F3FF33']);
  }
}

function generateCubes(numCubes, sizeRange, colors) {
  for (let i = 0; i < numCubes; i++) {
    let size = random(sizeRange[0], sizeRange[1]);
    let x = random(-200, 200);
    let y = random(-200, 200);
    let z = random(-200, 200);
    let color = random(colors);
    let planes = [];
    cubes.push({ x, y, z, size, color, planes});
  }
}

function draw_cube(cube){
  // this will draw a cube using 6 planes

  // for each of the 6 planes, get the plane centers
  let yp = createVector(cube.x, cube.y+(cube.size/2), cube.z);
  let ym = createVector(cube.x, cube.y-(cube.size/2), cube.z);
  let xp = createVector(cube.x+(cube.size/2), cube.y, cube.z);
  let xm = createVector(cube.x-(cube.size/2), cube.y, cube.z);
  let zp = createVector(cube.x, cube.y, cube.z+(cube.size/2));
  let zm = createVector(cube.x, cube.y, cube.z-(cube.size/2));

  console.log('yp, xp, zp: ', yp, xp, zp);
  
  //pythagorean theorum for corner dist from plane center
  // yada yada, intersection of 6 orthoganal planes = 8 points
  let corner_dist = sqrt(2*((cube.size/4)^2)) // ffffff-didnt need this, lol

  // generate 4 points per center, then dedup
  //yp's
  let yp_corners = [
    createVector(cube.x + (cube.size/4), cube.y+(cube.size/2), cube.z + cube.size/4),
    createVector(cube.x - (cube.size/4), cube.y+(cube.size/2), cube.z + cube.size/4),
    createVector(cube.x - (cube.size/4), cube.y+(cube.size/2), cube.z - cube.size/4),
    createVector(cube.x + (cube.size/4), cube.y+(cube.size/2), cube.z - cube.size/4),
  ];
  console.log('yp_corners: ', yp_corners);
  // beginShape();
  // vertex(yp_corners[0]);
  // vertex(yp_corners[1]);
  // vertex(yp_corners[2]);
  // vertex(yp_corners[3]);
  // endShape(CLOSE);

  let ym_corners = [
    (ym.x + (cube.size/4), ym.y, ym.z + cube.size/4),
    (ym.x - (cube.size/4), ym.y, ym.z + cube.size/4),
    (ym.x - (cube.size/4), ym.y, ym.z - cube.size/4),
    (ym.x + (cube.size/4), ym.y, ym.z - cube.size/4),
  ];

  let xp_corners = [
    (xp.x + (cube.size/4), xp.y, xp.z + cube.size/4),
    (xp.x - (cube.size/4), xp.y, xp.z + cube.size/4),
    (xp.x - (cube.size/4), xp.y, xp.z - cube.size/4),
    (xp.x + (cube.size/4), xp.y, xp.z - cube.size/4),
  ];
  console.log('xp_corners: ', xp_corners);
  // beginShape();
  // vertex(xp_corners[0]);
  // vertex(xp_corners[1]);
  // vertex(xp_corners[2]);
  // vertex(xp_corners[3]);
  // endShape(CLOSE);

  let xm_corners = [
    (xm.x + (cube.size/4), xm.y, xm.z + cube.size/4),
    (xm.x - (cube.size/4), xm.y, xm.z + cube.size/4),
    (xm.x - (cube.size/4), xm.y, xm.z - cube.size/4),
    (xm.x + (cube.size/4), xm.y, xm.z - cube.size/4),
  ];

  let zp_corners = [
    (zp.x + (cube.size/4), zp.y, zp.z + cube.size/4),
    (zp.x - (cube.size/4), zp.y, zp.z + cube.size/4),
    (zp.x - (cube.size/4), zp.y, zp.z - cube.size/4),
    (zp.x + (cube.size/4), zp.y, zp.z - cube.size/4),
  ];
  // beginShape();
  // vertex(zp_corners[0]);
  // vertex(zp_corners[1]);
  // vertex(zp_corners[2]);
  // vertex(zp_corners[3]);
  // endShape(CLOSE);

  let zm_corners = [
    (zm.x + (cube.size/4), zm.y, zm.z + cube.size/4),
    (zm.x - (cube.size/4), zm.y, zm.z + cube.size/4),
    (zm.x - (cube.size/4), zm.y, zm.z - cube.size/4),
    (zm.x + (cube.size/4), zm.y, zm.z - cube.size/4),
  ];

}
