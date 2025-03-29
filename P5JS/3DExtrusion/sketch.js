// cube extrusion, March 29th 2025
// Jesse Bourret-Gheysen

let cubes = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  generateCubes(50, [10, 50], ['#FF5733', '#33FF57', '#3357FF', '#F3FF33']);
}

function draw() {
  background(20);

  orbitControl(); // Enables mouse-controlled orbiting
  rotateY(frameCount * 0.005); // Slow rotation for effect

  for (let cube of cubes) {
    push();
    fill(cube.color);
    translate(cube.x, cube.y, cube.z);

    box(cube.size);
    pop();
  }
}

function extrusion(){
  applyMatrix(1, tan(frameCount/100), 0, 0,   // X-axis skew
              0, 1, cos(frameCount/10), 0,   // Y-axis normal
              0, 0, 1, 0,   // Z-axis normal
              cos(frameCount/100), 0, 0, 1);  // No translation
}

function mousePressed(){
  if (mouseButton === LEFT) {
    console.log("Left Click at", mouseX, mouseY);
  } else if (mouseButton === RIGHT) {
    console.log("Right Click at", mouseX, mouseY);
  } else if (mouseButton === CENTER) {
    console.log("Middle Click at", mouseX, mouseY);
  }
}

function generateCubes(numCubes, sizeRange, colors) {
  
  for (let i = 0; i < numCubes; i++) {
    let size = random(sizeRange[0], sizeRange[1]);
    let x = random(-200, 200);
    let y = random(-200, 200);
    let z = random(-200, 200);
    let color = random(colors);
    
    cubes.push({ x, y, z, size, color });
  }
}
