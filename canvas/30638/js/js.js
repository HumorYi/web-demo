// RequestAnimationFrame shim by Paul Irish
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

/* VARS
----------------------------------------------- */
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width,
    height,
    centerY,
    centerX,
    TWO_PI = Math.PI * 2,
    movePixels = 0,
    moveDirection = 1,
    moveThreshold = 151;

function Pattern(color, number, padding, stroke) {
    this.lineNum = number;
    this.padding = padding;
    this.color = color;
    this.stroke = stroke;
    this.dx = 0;
    this.dy = 0;
}

Pattern.prototype.draw = function(dx, dy) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.stroke;
    if (dy) {
        this.dy = dy;
    }

    if (dx) {
        this.dx = dx;
    }

    for (var i = 0; i < this.lineNum; i += 1) {
        ctx.beginPath();
        ctx.arc(centerX + this.dx, centerY + this.dy, (i * this.padding), 0, TWO_PI, false);
        ctx.stroke();
    }
}

function draw() {
    requestAnimFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var firstPattern = new Pattern('#E84D17', 20, 8, 3);
    var secondPattern = new Pattern('#1787E8', 20, 8, 3);
    firstPattern.draw();
    secondPattern.draw(movePixels);

    if (movePixels === moveThreshold || movePixels === -moveThreshold) {
        moveDirection = moveDirection * -1;
    }
    movePixels += moveDirection;
}

/* INIT
----------------------------------------------- */
canvasSize();
ctx.globalCompositeOperation = 'multiply';
draw();

/* UTILITIES
----------------------------------------------- */
function canvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    centerY = height / 2;
    centerX = width / 2;
    canvas.height = height;
    canvas.width = width;
}