var gridSize = 45;

var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

window.onresize = function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

var mouseX = innerWidth / 2,
    mouseY = innerHeight / 2,
    freeze = 0;

document.addEventListener('mousemove', function(e) {
    if (freeze == 0) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
})

document.addEventListener('click', function(e) {
    if (freeze == 1) {
        freeze = 0;
    } else {
        freeze = 1;
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
});

var lineGrad = ctx.createLinearGradient(0, 0, innerWidth, innerHeight);
lineGrad.addColorStop(0, '#f00');
lineGrad.addColorStop(0.2, '#ff0');
lineGrad.addColorStop(0.4, '#0f0');
lineGrad.addColorStop(0.6, '#0ff');
lineGrad.addColorStop(0.8, '#00f');
lineGrad.addColorStop(1, '#f0f');

function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    for (var i = 0 - innerWidth; i <= innerWidth * 2; i += gridSize) {
        ctx.strokeStyle = lineGrad;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        if (mouseX && mouseY) {
            ctx.quadraticCurveTo(mouseX, mouseY, i, innerHeight);
        } else {
            ctx.quadraticCurveTo(i, innerHeight / 2, i, innerHeight);
        }
        ctx.stroke();
    }
    for (var j = 0 - innerHeight; j < innerHeight * 2; j += gridSize) {
        ctx.strokeStyle = lineGrad;
        ctx.beginPath();
        ctx.moveTo(0, j);
        if (mouseX && mouseY) {
            ctx.quadraticCurveTo(mouseX, mouseY, innerWidth, j);
        } else {
            ctx.quadraticCurveTo(innerWidth / 2, j, innerWidth, j);
        }
        ctx.stroke();
    }
    window.requestAnimationFrame(draw);
}

draw();