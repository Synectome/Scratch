// cube generation by faces - chabetee base code
const CANVASX = 600;
const CANVASY = 600;
let cubes = [];
// let maxCubeSize = 30;
let avgCubeSize = 50;
let fov = Math.PI / 3;

// these values store stretchers
let a = 0;
let d = 0;
let ww = 0;
let w = 0;
let q = 0;
let e = 0;

function setup() {
  createCanvas(CANVASX, CANVASY, WEBGL);
  generateCubes(50, [30,70],['#FF5733', '#33FF57', '#3357FF', '#F3FF33']);
  // gradientImg = createGradient(width, height); // Generate gradient image
  
}

function draw() {
  orbitControl(); // Enables mouse-controlled orbiting
  rotateY(millis() * 0.00005); // Slow rotation for effect
  rotateZ(-45);
  rotateX(-45);

  // changing colours background
  // background(200 + sin(frameCount/30)*30, 100 + sin(frameCount/20)*30, 50 + cos(frameCount/10)*40);
  background(20 + sin(frameCount/30)*15, 20 + sin(frameCount/30)*15, 20 + sin(frameCount/30)*15);
  // radial gradient background
  
  // defines the center of the normal distribution as it ocillates,
  // read as the surface of a sphere from the center of the view ----> PARAMETERIZE THIS LATER
  // let ripple_peri = sin(millis()/30)*100;
  fill(0, 100, 255, 150);
  // noStroke();
  // sphere(ripple_peri);
  // stroke(255);
  
  // call gaussian dist funk for amplitude->cube size change
  // let gaussy = gaussian(size, ripple_peri, 15)

  // a = 10 + cos(frameCount/20)*30;
  // d = 15 + sin(frameCount/15)*35;
  // ww = 15 + sin(frameCount/40)*50;
  // e = 20 + cos(frameCount/10)*15;
  adjustZoom()
  avgCubeSize = 0;
  for (let cube of cubes){
    avgCubeSize += cube.size;

    cube.size += lerp(0, 5*tan(frameCount/15), 0.2);
    if (abs(cube.size) > 280){
      cube.size = random(20, 70);
    }

    // console.log('cube.size', cube.size);
    drawCube(cube.x, cube.y, cube.z, cube.size);
  }
  avgCubeSize /= cubes.length;
  
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
    createVector(x - halfS + a, y - halfS + w, z - halfS + q), // 0: Front-top-left
    createVector(x + halfS + a, y - halfS + w, z - halfS + e), // 1: Front-top-right
    createVector(x + halfS + d, y + halfS + w, z - halfS + e), // 2: Front-bottom-right
    createVector(x - halfS + d, y + halfS + w, z - halfS + q), // 3: Front-bottom-left
    createVector(x - halfS + a, y - halfS + ww, z + halfS + q), // 4: Back-top-left
    createVector(x + halfS + a, y - halfS + ww, z + halfS + e), // 5: Back-top-right
    createVector(x + halfS + d, y + halfS + ww, z + halfS + e), // 6: Back-bottom-right
    createVector(x - halfS + d, y + halfS + ww, z + halfS + q)  // 7: Back-bottom-left
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


  if (keyIsDown(SHIFT) && key === 'A') {
    console.log("a Pressed! ", a);
    a -= 10;
  }else if (keyIsDown(SHIFT) && key === 'D') {
    console.log("d Pressed! ", d);
    d -= 10;
  }else if (keyIsDown(SHIFT) && key === 'W') {
    console.log("w Pressed! ", w);
    w -= 10;
  }else if (keyIsDown(SHIFT) && key === 'S') {
    console.log("s Pressed! ", ww);
    ww -= 10;
  }else if (keyIsDown(SHIFT) && key === 'Q') {
    console.log("q Pressed! ", q);
    q -= 10;
  }else if (keyIsDown(SHIFT) && key === 'E') {
    console.log("e Pressed! ", e);
    e -= 10;
  }else if (key === 'a') {
    console.log("a Pressed! ", a);
    a += 10;
  }else if (key === 'd') {
    console.log("d Pressed! ", d);
    d += 10;
  }else if (key === 'w') {
    console.log("w Pressed! ", w);
    w += 10;
  }else if (key === 's') {
    console.log("s Pressed! ", ww);
    ww += 10;
  }else if (key === 'q') {
    console.log("q Pressed! ", q);
    q += 10;
  }else if (key === 'e') {
    console.log("e Pressed! ", e);
    e += 10;
  }
  
  
  if (key === 'x') {
    console.log("x Pressed! adding cube");
    generateCubes(1, [30,70],['#FF5733', '#33FF57', '#3357FF', '#F3FF33']);
  }else if (key === 'z') {
    console.log("z Pressed! removing cube");
    cubes.pop();
  }
}

function mousePressed(){
  if (mouseButton === LEFT) {
    console.log("Left Click at", mouseX, mouseY);
    // extrusion(frameCount%CANVASX);
  } else if (mouseButton === RIGHT) {
    console.log("Right Click at", mouseX, mouseY);
  } else if (mouseButton === CENTER) {
    // wibe cube list, and reenstate
    console.log("Middle Click at", mouseX, mouseY);
    cubes = [];
    generateCubes(50, [10, 50], ['#FF5733', '#33FF57', '#3357FF', '#F3FF33']);
  }
}

// Function to adjust zoom based on object visibility - thanks cheebeetee
function adjustZoom() {
  let sceneSize = avgCubeSize * 4; // Determine scene size
  if (sceneSize < 250){
    sceneSize = 250;
  }
  let idealFov = map(sceneSize, 100, 400, Math.PI / 6, Math.PI / 2, true); // Map size to reasonable FOV
  // console.log('idealFOV', idealFov);
  // console.log('sceneSize', sceneSize);
  
  let distance = sceneSize / (2 * tan(fov / 2)); // Adjusted camera distance
  // console.log('distance', distance);
  // targetFov = idealFov; // Set the target fov
  fov = lerp(fov, idealFov, 0.05);
  // console.log('fov', fov);
  perspective(fov, CANVASX/CANVASY, 0.1, distance * 10);
}
