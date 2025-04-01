// cube generation by faces - chabetee base code
const CANVASX = 600;
const CANVASY = 600;
let cubes = [];

function setup() {
  createCanvas(CANVASX, CANVASY, WEBGL);
  generateCubes(50, [30,70],['#FF5733', '#33FF57', '#3357FF', '#F3FF33']);
}

function draw() {
  orbitControl(); // Enables mouse-controlled orbiting
  rotateY(frameCount * 0.005); // Slow rotation for effect

  background(220);
  
  // defines the center of the normal distribution as it ocillates,
  // read as the surface of a sphere from the center of the view ----> PARAMETERIZE THIS LATER
  let ripple_peri = 100 + sin(frameCount/30)*80;
  
  
  // call gaussian dist funk for amplitude->cube size change
  let gaussy = gaussian()

  
  for (let cube of cubes){
    // the gaussy weight is actually inverse, because when it is zero, the affect on cube size is at max
    let gaussy_amplitude_weight_on_cube_size = dist(ripple_peri, ripple_peri, ripple_peri, cube.x, cube.y, cube.z);
    drawCube(cube.x, cube.y, cube.z, cube.size+(cos(frameCount/10)*5));
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

// using this to get a normal distribution, to similate a ripple
function gaussian(x, mean, stdDev) {
  let exponent = -((x - mean) ** 2) / (2 * stdDev ** 2);
  return Math.exp(exponent);
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
