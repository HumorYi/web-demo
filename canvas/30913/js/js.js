const TWO_PI = Math.PI * 2;

//general
var canvas = document.getElementById('canvas'),
    ctx,
    timeStep = (1 / 60),
    time = 0;
center = new Point(),
    r = 0;

var circles = [];
var circleSize = 60;
var colorize = true;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    center.x = canvas.width / 2;
    center.y = canvas.height / 2;

    ctx = canvas.getContext('2d');
}

function createCircleArray() {
    var circleDistance = -6;

    var canvasWidth = canvas.width + circleSize,
        canvasHeight = canvas.height + circleSize,
        halfCircle = circleSize / 2;

    for (var x = 0; x < canvasWidth; x += circleSize) {
        for (var y = 0; y < canvasHeight; y += circleSize) {
            var startAngle = (x + y) / 2.5;
            var circle = new Circle(x, y, halfCircle + circleDistance, startAngle, null, null, 2, startAngle);
            circles.push(circle);
        }
    }
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.onload = function() {
    initCanvas();
    createCircleArray();
    requestAnimFrame(loop);
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(function(o) {
        o.draw();
    });
}

function update() {
    var o;

    for (var i = 0; i < circles.length; i++) {
        o = circles[i];
        o.update();
    }

}

function loop() {
    update();
    draw();
    time += timeStep;
    requestAnimFrame(loop);
}

function Circle(x, y, radius, color, linewidth, dotSize, speed, angle) {
    this.radius = radius || 20;
    this.color = color || '100';
    this.linewidth = linewidth || 1;
    this.angle = angle || 0;
    this.speed = speed || 2;

    this.position = new Point(x, y);
    this.dotRadius = dotSize || 3;
    this.dotPosition = new Point(x, y);
    this.originalX = x;
    this.originalY = y;
    this.visible = true;
    this.colorize = colorize;
}
Circle.prototype = {
    update: function() {
        this.angle += this.speed;

        this.color += 2.5;

        this.dotPosition.x = (circleSize - this.dotRadius * 4) * Math.cos(this.angle * Math.PI / 180) + this.originalX;
        this.dotPosition.y = (circleSize - this.dotRadius * 4) * Math.sin(this.angle * Math.PI / 180) + this.originalY;

    },
    draw: function() {
        if (this.visible === false) return;
        var light = 60;
        if (this.colorize === false) light = 100;
        ctx.globalAlpha = 1;
        ctx.lineWidth = this.linewidth;
        ctx.strokeStyle = "hsl(" + this.color + ", 0%, " + light + "%)";
        ctx.fillStyle = "hsl(" + this.color + ", 80%, " + light + "%)";

        strokeCircle(this.position.x, this.position.y, this.radius * 2);
        fillCircle(this.dotPosition.x, this.dotPosition.y, this.dotRadius * 2);
    }
};

function Point(x, y) {
    this.x = x || null;
    this.y = y || null;
}

function fillCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function strokeCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
}