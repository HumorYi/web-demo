// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Vars
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = 700,
    height = 700,
    centerY = height / 3,
    centerX = width / 2,
    circleNum = 174,
    circles = [],
    circleIndex = 0,
    tracker = 0,
    time = 0;

function Circle(i, posXY, radius) {
    this.i = i;
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.posX = posXY;
    this.posY = posXY;
    this.color = i % 2 === 1 ? 'rgba(0, 175, 204, 1)' : 'rgba(204, 86, 0, 1)';
    this.scale = 250;
    circleIndex++;
    circles[circleIndex] = this;
}

Circle.prototype.draw = function() {
    this.x = centerX + this.scale * Math.cos(time + (this.i * circleNum));
    this.y = centerY + this.scale * Math.sin(2 * (time + (this.i / circleNum))) / 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}

for (var i = 0; i < circleNum; i++) {
    new Circle(i, 350, 4);
}

// Keep track of time
function timeTrack() {
    tracker++;
    time = tracker / 50;
}

// Init
loop();

// rAF loop
function loop() {
    requestAnimFrame(loop);

    // Clear context
    ctx.clearRect(0, 0, width, height);

    // Draw function
    for (var i in circles) {
        circles[i].draw();
    }

    // Time tracker
    timeTrack();
};