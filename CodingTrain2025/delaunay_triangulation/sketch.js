let seedPoints = [];
let delaunay;

function setup() {
    createCanvas(1000, 800);
    for (let i = 0; i< 500; i++){
        seedPoints[i] = createVector(random(width), random(height));
    }

    delaunay = calculateDelauny(seedPoints);
}

function draw() {
    background(255);

    for (let v of seedPoints) {
        stroke(0);
        strokeWeight(4);
        point(v.x, v.y);
    }

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

function calculateDelauny(seedPoints) {
    let pointsArray = [];
    for (let v of seedPoints) {
        pointsArray.push(v.x, v.y);
    }
    console.log(seedPoints);
    return new d3.Delaunay(pointsArray);
}