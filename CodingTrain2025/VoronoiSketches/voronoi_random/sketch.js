//https://www.youtube.com/watch?v=Bxdt6T_1qgc
let seedPoints = [];
let delaunay;

function setup() {
    createCanvas(1000, 800);
    for (let i = 0; i< 200; i++){
        seedPoints[i] = createVector(random(width), random(height));
    }
    delaunay = calculateDelaunay(seedPoints);
    // voronoi = delaunay.voronoi([0, 0, width, height]);
}


function draw() {
    background(255);

    // plot the points 
    for (let v of seedPoints) {
        stroke(0);
        strokeWeight(4);
        point(v.x, v.y);
    }

    // plot the delaunay triangles
    noFill();
    strokeWeight(1);
    // let {points, triangles} = delaunay;
    // for (let i = 0; i < triangles.length; i += 3) {
    //     let a = 2 * delaunay.triangles[i];
    //     let b = 2 * delaunay.triangles[i+1];
    //     let c = 2 * delaunay.triangles[i+2];
    //     triangle(
    //         points[a], points[a+1],
    //         points[b], points[b+1],
    //         points[c], points[c+1]
    //     )
    // }

    // plot the voronoi points
    // voronoi bounding box
    let voronoi = delaunay.voronoi([0, 0, width, height]);
    let polygons = voronoi.cellPolygons();
    let cells = Array.from(polygons);
    for (let poly of cells) {
        stroke(0);
        strokeWeight(1);
        noFill();
        beginShape();
        for (let i = 0; i < poly.length; i++) {
            vertex(poly[i][0], poly[i][1]);
        }
        endShape();
    }
    
    // centroid calculation - start of loyds relazation algorithm
    let centroids = [];
    for (let poly of cells) {
        let area = 0;
        let centroid = createVector();
        for (let i = 0; i < poly.length; i++){
            let v0 = poly[0];
            let v1 = poly[(i+1) % poly.length];
            let crossValue = v0[0] * v1[1] - v1[0] * v0[1];
            area += crossValue;
            centroid.x += (v0[0] + v1[0]) * crossValue;
            centroid.y += (v0[1] + v1[1]) * crossValue;
        }
        area /= 3;
        centroid.div(6*area);
        centroids.push(centroid);
        stroke(2);
        strokeWeight(2);
    }
    console.log(centroids);

    for (let i = 0; i < seedPoints.length; i++) {
        seedPoints[i].lerp(centroids[i], 0.01);
    }

    delaunay = calculateDelaunay(seedPoints);
    voronoi = delaunay.voronoi([0, 0, width, height]);
}

function calculateDelaunay(seedPoints) {
    let pointsArray = [];
    for (let v of seedPoints) {
        pointsArray.push(v.x, v.y);
    }
    // console.log(seedPoints);
    return new d3.Delaunay(pointsArray);
}