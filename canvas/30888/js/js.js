var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = 400;
var ch = c.height = 400;
var cx = cw / 2,
    cy = ch / 2;
var rad = Math.PI / 180;

var stopped = true;
ctx.fillStyle = "Cornsilk";

var A = 360 / 32;
var k = 1;
var r = 20, //inner radiun
    dr1 = 5, //first control point
    dr2 = 35, //second control point
    dr3 = 35;
var a = 0

function drawLayer() {

    k = (k == 1) ? -1 : 1;
    d = k * 45, d1 = k * -20, d2 = k * 20;

    for (var j = 0; j < 360 / A; j++) {
        var i = j * A + a * k;

        x0 = cx + r * Math.cos(i * rad);
        y0 = cy + r * Math.sin(i * rad);

        px1 = cx + (r + dr1) * Math.cos((i - d1) * rad);
        py1 = cy + (r + dr1) * Math.sin((i - d1) * rad);
        px2 = cx + (r + dr2) * Math.cos((i + d2) * rad);
        py2 = cy + (r + dr2) * Math.sin((i + d2) * rad);

        x3 = cx + (r + dr3) * Math.cos((i + d) * rad);
        y3 = cy + (r + dr3) * Math.sin((i + d) * rad);
        //-----------------------
        x4 = cx + (r + dr3) * Math.cos((i + (A / 2) + d) * rad);
        y4 = cy + (r + dr3) * Math.sin((i + (A / 2) + d) * rad);

        px5 = cx + (r + dr2) * Math.cos((i + d2 + (A / 2)) * rad);
        py5 = cy + (r + dr2) * Math.sin((i + d2 + (A / 2)) * rad);
        px6 = cx + (r + dr1) * Math.cos((i - d1 + (A / 2)) * rad);
        py6 = cy + (r + dr1) * Math.sin((i - d1 + (A / 2)) * rad);

        x7 = cx + r * Math.cos((i + (A / 2)) * rad);
        y7 = cy + r * Math.sin((i + (A / 2)) * rad);

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(px1, py1, px2, py2, x3, y3);
        ctx.lineTo(x4, y4);
        ctx.bezierCurveTo(px5, py5, px6, py6, x7, y7);
        ctx.fill();

    }
    r += dr3;
}

function Draw() {
    r = 20;
    k = 1;
    a++;
    ctx.clearRect(0, 0, cw, ch)

    drawLayer();
    drawLayer();
    drawLayer();
    drawLayer();
    drawLayer();
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