let circles;
let spots;
let img;

function preload() {
    img = loadImage("arvestanoc.jpeg");
}

function setup() {

    frameRate(120)
    createCanvas(1280, 351);

    // image(img,0, 0);
    img.loadPixels();
    spots = [];
    circles = [];
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let index = x + y * img.width;
            let c = img.pixels[index * 4];
            let b = brightness([c]);
            if (b > 1) {
                spots.push(createVector(x, y));
            }
        }
    }
}

function draw() {
    let total = 3;
    let count = 0;
    let attempts = 0;

    while (count < total) {
        let newC = newCircle();
        if (newC !== null) {
            circles.push(newC);
            count++;
        }
        attempts++;
        if (attempts > 1000) {
            noLoop();
            break;
        }
    }

    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];

        if (circle.growing) {
            if (circle.edges()) {
                circle.growing = false;
            } else {
                for (let j = 0; j < circles.length; j++) {
                    let other = circles[j];
                    if (circle !== other) {
                        var d = dist(circle.x, circle.y, other.x, other.y);
                        var distance = circle.r + other.r;

                        if (d - 4 < distance) {
                            circle.growing = false;
                            break;
                        }
                    }
                }
            }
        }

        circle.show();
        circle.grow();
    }
}

function newCircle() {
    let r = int(random(0, spots.length));
    let spot = spots[r];
    let x = spot.x;
    let y = spot.y;

    let valid = true;
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        let d = dist(x, y, circle.x, circle.y);
        if (d < circle.r) {
            valid = false;
            break;
        }
    }
    if (valid) {
        return new Circle(x, y, [random(255), random(255), random(255)]);
    } else {
        return null;
    }
}
