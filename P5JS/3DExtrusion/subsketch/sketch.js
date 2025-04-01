
let stdDev = 15; // Spread of the curve
let amplitude = 30; // Peak value

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(220);
  console.log('in the draw');
  stroke(0);
  noFill();
  beginShape();

  let mean = 50*sin(frameCount/100);  // Center of the curve
  
  for (let x = 0; x <= 100; x += 1) {
    let y = gaussian(x, mean, stdDev) * amplitude; // Scale to max height 30
    vertex(map(x, 0, 100, 50, width - 50), map(y, 0, 30, height - 50, 50));
  }
  
  endShape();
}

// Gaussian function
function gaussian(x, mean, stdDev) {
  let exponent = -((x - mean) ** 2) / (2 * stdDev ** 2);
  return Math.exp(exponent);
}
