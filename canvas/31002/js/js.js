var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = 400;
var ch = c.height = 400;
var cx = cw / 2,
    cy = ch / 2;
var rad = Math.PI / 180;
var frames = 0;
var stopped = true;
var phi = 0;

ctx.lineWidth = 1;
ctx.fillStyle = "rgba(0,0,0,1)";
var R = 60;

var A = 1; //1,2,...
var B = 2; //1,2,...
var K = 122; // K = 0,1,2,3,4,5,.....360...

function polarSineFlower(R, A, B, K) {
    ctx.beginPath();
    for (var a = 0; a < 360; a++) {

        var r = A * R + B * R * Math.sin(K * a * rad);

        var x = cx + r * Math.cos(a * rad);
        var y = cy + r * Math.sin(a * rad);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
}

function Draw() {
    phi += .01;
    ctx.globalAlpha = .1;
    ctx.clearRect(0, 0, cw, ch)
    for (var i = 0; i < 90; i += 12) {
        r = R * (Math.sin(i * rad + phi));
        var l = 10 + i
        ctx.strokeStyle = "hsl(200,100%," + l + "%)";
        polarSineFlower(r, A, B, K)
    }

    requestId = window.requestAnimationFrame(Draw);
}

function start() {
    requestId = window.requestAnimationFrame(Draw);
    stopped = false;
}

function stopAnim() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
    }
    stopped = true;
}

window.addEventListener("load", function() {
    start();
}, false);
c.addEventListener("click", function() {
    (stopped == true) ? start(): stopAnim();
}, false)