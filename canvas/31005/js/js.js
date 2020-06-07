canvas = document.getElementById("canvas");
context = canvas.getContext('2d');
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
radius = H * 0.45;

ticks = [];
for (var i = 0; i <= 360; i += 5) {
    ticks.push(i);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function calcPoints() {
    points = [];
    for (var i = 0; i < ticks.length; i++) {
        points.push([
            W / 2 + Math.cos(toRadians(ticks[i])) * radius,
            H / 2 + Math.sin(toRadians(ticks[i])) * radius
        ]);
    }
}

function drawHeart(dashL, dashO) {
    context.beginPath();
    context.lineWidth = 1.2;
    context.setLineDash([dashL, dashO]);
    context.strokeStyle = '#F6465F';

    //layer 1 - partial contentric circle

    //first half
    offset = 18;
    for (var i = 0; i <= 18; i++) {
        context.moveTo(points[i][0], points[i][1]);
        context.lineTo(points[i + offset][0], points[i + offset][1]);
    }

    //second half 
    for (var i = 36; i <= 54; i++) {
        context.moveTo(points[i][0], points[i][1]);
        context.lineTo(points[i + offset][0], points[i + offset][1]);
    }

    //layer 2 - partial cardioid

    //first half
    offset = 20;
    for (var i = 18; i < 36; i++) {
        context.moveTo(points[i][0], points[i][1]);
        context.lineTo(points[i + offset][0], points[i + offset][1]);

        offset++;
    }

    //second half
    offset = 20;
    for (var i = 54; i > 36; i--) {
        context.moveTo(points[i][0], points[i][1]);
        context.lineTo(points[i - offset][0], points[i - offset][1]);

        offset++;
    }

    context.stroke();
    context.closePath();
}

calcPoints();
//drawHeart(2);
update();

var dashLength = 100;
var dashOffset = 100;

function update() {
    if (dashLength < 450) {
        dashLength += 2;
        context.clearRect(0, 0, W, H);
        drawHeart(dashLength, dashOffset);
    }
    window.requestAnimationFrame(update);
}

window.addEventListener('resize', function(e) {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    radius = H * 0.45;
    context.clearRect(0, 0, W, H);
    calcPoints();
    drawHeart();
}, false);