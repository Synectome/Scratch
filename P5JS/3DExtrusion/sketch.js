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
    calculate_cube_points(cube);
    pop();
  }
  // noLoop();
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
    let size = 500; //random(sizeRange[0], sizeRange[1]);
    let x = 0; //random(-200, 200);
    let y = 0; //random(-200, 200);
    let z = 0; //random(-200, 200);
    // let size = random(sizeRange[0], sizeRange[1]);
    // let x = random(-200, 200);
    // let y = random(-200, 200);
    // let z = random(-200, 200);
    let color = random(colors);
    let planes = [];
    cubes.push({ x, y, z, size, color, planes});
  }
}

// Function to compute normal vector of a plane given 3 points (Gracias chatGPT, march 30th 2025)
function getNormal(a, b, c) {
  let v1 = p5.Vector.sub(b, a);
  let v2 = p5.Vector.sub(c, a);
  return p5.Vector.cross(v1, v2).normalize();
}

function calculate_cube_points(cube){
  // this will draw a cube using 6 planes

  // for each of the 6 planes, get the plane centers
  // checked the results (march 30, 2:12pm) correct
  let yp = createVector(cube.x, cube.y+(cube.size/2), cube.z);
  let ym = createVector(cube.x, cube.y-(cube.size/2), cube.z);
  let xp = createVector(cube.x+(cube.size/2), cube.y, cube.z);
  let xm = createVector(cube.x-(cube.size/2), cube.y, cube.z);
  let zp = createVector(cube.x, cube.y, cube.z+(cube.size/2));
  let zm = createVector(cube.x, cube.y, cube.z-(cube.size/2));

  // for (let co of [xp, yp, zp, xm, ym, zm]){
  //   console.log(`pl_center = ${co.x}, ${co.y}, ${co.z}`);
  // }

  // console.log('yp, xp, zp: ', yp, xp, zp);
  
  //pythagorean theorum for corner dist from plane center
  // yada yada, intersection of 6 orthoganal planes = 8 points
  let corner_dist = sqrt(2*((cube.size/4)^2)) // ffffff-didnt need this, lol

  // these corner calculations, are wrong...
  let yp_corners = [
    createVector(yp.x + (cube.size/4), yp.y, yp.z + cube.size/4),
    createVector(yp.x - (cube.size/4), yp.y, yp.z + cube.size/4),
    createVector(yp.x - (cube.size/4), yp.y, yp.z - cube.size/4),
    createVector(yp.x + (cube.size/4), yp.y, yp.z - cube.size/4),
  ];
  console.log("yp_corners: ", yp_corners);

  let ym_corners = [
    createVector(ym.x + (cube.size/4), ym.y, ym.z + cube.size/4),
    createVector(ym.x - (cube.size/4), ym.y, ym.z + cube.size/4),
    createVector(ym.x - (cube.size/4), ym.y, ym.z - cube.size/4),
    createVector(ym.x + (cube.size/4), ym.y, ym.z - cube.size/4),
  ];

  let xp_corners = [
    createVector(xp.x + (cube.size/4), xp.y, xp.z + cube.size/4),
    createVector(xp.x - (cube.size/4), xp.y, xp.z + cube.size/4),
    createVector(xp.x - (cube.size/4), xp.y, xp.z - cube.size/4),
    createVector(xp.x + (cube.size/4), xp.y, xp.z - cube.size/4),
  ];

  let xm_corners = [
    createVector(xm.x + (cube.size/4), xm.y, xm.z + cube.size/4),
    createVector(xm.x - (cube.size/4), xm.y, xm.z + cube.size/4),
    createVector(xm.x - (cube.size/4), xm.y, xm.z - cube.size/4),
    createVector(xm.x + (cube.size/4), xm.y, xm.z - cube.size/4),
  ];

  let zp_corners = [
    createVector(zp.x + (cube.size/4), zp.y, zp.z + cube.size/4),
    createVector(zp.x - (cube.size/4), zp.y, zp.z + cube.size/4),
    createVector(zp.x - (cube.size/4), zp.y, zp.z - cube.size/4),
    createVector(zp.x + (cube.size/4), zp.y, zp.z - cube.size/4),
  ];

  let zm_corners = [
    createVector(zm.x + (cube.size/4), zm.y, zm.z + cube.size/4),
    createVector(zm.x - (cube.size/4), zm.y, zm.z + cube.size/4),
    createVector(zm.x - (cube.size/4), zm.y, zm.z - cube.size/4),
    createVector(zm.x + (cube.size/4), zm.y, zm.z - cube.size/4),
  ];

  // ------------------------- HERE IS WHERE DRAWING OCCURS
  // vertex_draw([xp, yp, zp]);
  // vertex_draw([xm, ym, zm]);

  push();
  // translate(xm_corners[0]);
  // rotateZ(90);
  vertex_draw(xm_corners);
  pop();
  
  // push();
  // translate(ym);
  // rotateX(90);
  // vertex_draw(ym_corners);
  // pop();
  vertex_draw(ym_corners);
  vertex_draw(zm_corners);
  vertex_draw(xp_corners);
  vertex_draw(yp_corners);
  vertex_draw(zp_corners);

  // there should be 3 common points between these planes if my math is right
  // console.log(xm_corners);
  // console.log(yp_corners);
  // console.log(zm_corners);

}

function vertex_draw(coord_list){

  // console.log("coordlist = ", coord_list);

  // provide 3 points from coord list to calc normal
  let normal = getNormal(coord_list[0], coord_list[1], coord_list[2]);
  // Compute basis vectors
  let xAxis = p5.Vector.sub(coord_list[0], coord_list[1]).normalize();
  let yAxis = p5.Vector.cross(normal, xAxis).normalize();
  push();
  applyMatrix(
    xAxis.x, yAxis.x, normal.x, 0,
    xAxis.y, yAxis.y, normal.y, 0,
    xAxis.z, yAxis.z, normal.z, 0,
    0,       0,       0,       1
  );
  beginShape();
  for (let coord of coord_list){
    // console.log(`coords : ${coord.x}, ${coord.y}, ${coord.z}`);
    vertex(coord.x, coord.y, coord.z);
  }
  endShape(CLOSE);
  pop();

}