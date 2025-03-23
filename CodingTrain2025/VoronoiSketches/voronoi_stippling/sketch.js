console// Coding Train / Daniel Shiffman
// Weighted Voronoi Stippling
// https://thecodingtrain.com/challenges/181-image-stippling

// All of the points
let points = [];
// Global variables for geometry
let delaunay, voronoi;
// Image
let photo_file;

// Load image before setup
function preload() {
  photo_file = loadImage("/jesse2.jpg");
}

function setup() {
  createCanvas(1200, 1064);

  // Generate random points avoiding bright areas
  generateRandomPoints(8000);

  // Calculate Delaunay triangulation and Voronoi diagram
  delaunay = calculateDelaunay(points);
  voronoi = delaunay.voronoi([0, 0, width, height]);
  // noLoop()
}

function draw() {
  background(255);

  // Display points
  displayPoints();

  // Calculate centroids and update points
  updatePoints();
}

// Generate random points avoiding bright areas
function generateRandomPoints(n) {
  for (let i = 0; i < n; i++) {
    let x = random(width);
    let y = random(height);
    let col = photo_file.get(x, y);
    if (random(100) > brightness(col)) {
      points.push(createVector(x, y));
    } else {
      i--;
    }
  }
}

// Display points
function displayPoints() {
  for (let v of points) {
    stroke(0);
    strokeWeight(4);
    point(v.x, v.y);
  }
}

// Calculate centroids and update points
function updatePoints() {
  // Get latest polygons
  let polygons = voronoi.cellPolygons();
  let cells = Array.from(polygons);
  
  // Arrays for centroids and weights
  let centroids = new Array(cells.length);
  let weights = new Array(cells.length).fill(0);
  for (let i = 0; i < centroids.length; i++) {
    centroids[i] = createVector(0, 0);
  }
  
  // Get the weights of all the pixels and assign to cells
  photo_file.loadPixels();
  let delaunayIndex = 0;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let index = (i + j * width) * 4;
      let r = photo_file.pixels[index + 0];
      let g = photo_file.pixels[index + 1];
      let b = photo_file.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let weight = 1 - bright / 255;
      delaunayIndex = delaunay.find(i, j, delaunayIndex);
      centroids[delaunayIndex].x += i * weight;
      centroids[delaunayIndex].y += j * weight;
      weights[delaunayIndex] += weight;
    }
  }
  
  // Compute weighted centroids
  for (let i = 0; i < centroids.length; i++) {
    if (weights[i] > 0) {
      centroids[i].div(weights[i]);
    } else {
      centroids[i] = points[i].copy();
    }
  }
  
  // Interpolate points
  for (let i = 0; i < points.length; i++) {
    points[i].lerp(centroids[i], 0.1);
  }
  
  // Next voronoi (relaxation)
  delaunay = calculateDelaunay(points);
  // draw delaunay triangle
  drawTriangles(delaunay);
  voronoi = delaunay.voronoi([0, 0, width, height]);
}

function drawTriangles(delaunay){
  noFill();
  strokeWeight(1);
  let {points, triangles} = delaunay;
  for (let i = 0; i < triangles.length; i += 3) {
      let a = 2 * delaunay.triangles[i];
      let b = 2 * delaunay.triangles[i+1];
      let c = 2 * delaunay.triangles[i+2];
      triangle(
          points[a], points[a+1],
          points[b], points[b+1],
          points[c], points[c+1]
      )
  }
}

// Calculate Delaunay triangulation from p5.Vectors
function calculateDelaunay(points) {
  let pointsArray = [];
  for (let v of points) {
    pointsArray.push(v.x, v.y);
  }
  return new d3.Delaunay(pointsArray);
}
