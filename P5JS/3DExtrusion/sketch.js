// cube generation by faces - chabetee base code
const CANVASX = 600;
const CANVASY = 600;
let cubes = [];

function setup() {
  createCanvas(CANVASX, CANVASY, WEBGL);
}

function draw() {
  orbitControl(); // Enables mouse-controlled orbiting
  background(220);
  
  // Call function to draw a cube at (0, 0, 0) with size 100
  drawCube(0, 0, 0, 100);
}

function drawCube(x, y, z, s) {
  let halfS = s / 2; // Half size for centering
  
  // Define 8 corner vertices of the cube
  let v = [
    createVector(x - halfS, y - halfS, z - halfS), // 0: Front-top-left
    createVector(x + halfS, y - halfS, z - halfS), // 1: Front-top-right
    createVector(x + halfS, y + halfS, z - halfS), // 2: Front-bottom-right
    createVector(x - halfS, y + halfS, z - halfS), // 3: Front-bottom-left
    createVector(x - halfS, y - halfS, z + halfS), // 4: Back-top-left
    createVector(x + halfS, y - halfS, z + halfS), // 5: Back-top-right
    createVector(x + halfS, y + halfS, z + halfS), // 6: Back-bottom-right
    createVector(x - halfS, y + halfS, z + halfS)  // 7: Back-bottom-left
  ];
  
  // Draw each face using 4 vertices
  push();
  fill(255, 0, 0, 150); drawQuad(v[0], v[1], v[2], v[3]); // Front
  fill(0, 255, 0, 150); drawQuad(v[4], v[5], v[6], v[7]); // Back
  fill(0, 0, 255, 150); drawQuad(v[0], v[1], v[5], v[4]); // Top
  fill(255, 255, 0, 150); drawQuad(v[3], v[2], v[6], v[7]); // Bottom
  fill(255, 0, 255, 150); drawQuad(v[0], v[3], v[7], v[4]); // Left
  fill(0, 255, 255, 150); drawQuad(v[1], v[2], v[6], v[5]); // Right
  pop();
}

// Function to draw a quadrilateral (face of the cube)
function drawQuad(v1, v2, v3, v4) {
  beginShape();
  vertex(v1.x, v1.y, v1.z);
  vertex(v2.x, v2.y, v2.z);
  vertex(v3.x, v3.y, v3.z);
  vertex(v4.x, v4.y, v4.z);
  endShape(CLOSE);
}
