var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = 450;
var ch = c.height = 400;
var cx = cw / 2,
    cy = ch / 2;
var rad = Math.PI / 180;
var w = 400;
//var h = 100;
var amplitude = 50;
var rectW = 40;
var frequency = .01;
var phi = 0;
var frames = 0;
var stopped = true;
var colors = ["#ffe", "#ddc", "#aa9"]
ctx.strokeStyle = "#ddc";
ctx.lineWidth = 1;

function Draw() {
    frames++
    phi = frames / 30;
    ctx.clearRect(0, 0, cw, ch);
    ctx.beginPath();
    var a = -45;
    for (var x = 0; x < w; x += rectW) {
        //a--;
        ys = Math.sin(x * frequency + phi) * amplitude + amplitude;
        yc = Math.cos(x * frequency + phi) * amplitude + amplitude;

        parallelepiped(x + 24 * Math.cos(a * rad), ys + 20, rectW - 5, 150, a, colors);
        parallelepiped(x, yc + 40, rectW - 5, 165, a, colors);

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
}, false);

function parallelepiped(x, y, w, yb, a, colors) {
    h = yb - y;
    ctx.fillStyle = colors[1];

    var x1 = x + w;
    var y1 = y;
    var x2 = x1;
    var y2 = y + h;
    var x3 = x;
    var y3 = y2;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = colors[0];
    // small lozenge
    var x4 = x + (w / 2) * Math.cos(a * rad);
    var y4 = y + (w / 2) * Math.sin(a * rad);
    var x5 = x4 + w;
    var y5 = y4;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x5, y5);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.fill();

    //large lozenge
    ctx.fillStyle = colors[2];
    var x6 = x2 + (w / 2) * Math.cos(a * rad);
    var y6 = y2 + (w / 2) * Math.sin(a * rad);

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x6, y6);
    ctx.lineTo(x5, y5);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.fill();
}