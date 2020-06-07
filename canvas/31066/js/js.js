var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = 400,
    cx = cw / 2;
var ch = c.height = 400,
    cy = ch / 2;
ctx.fillStyle = "rgba(0,0,0,.5)";
var amplitude = 10;
var frequence = 0
var a = 0;
var phi = 0;
var frames = 0;
var spiralsNumber = 6;

function Draw() {
    var a = 0;
    var amplitude = 1;
    frames += .5;
    phi += .05;
    frequence -= .0005 * Math.sin(frames * Math.PI / 180);
    ctx.fillRect(0, 0, cw, ch);
    for (var n = 0; n < spiralsNumber; n++) {
        drawSpiral(a, amplitude, phi, frequence, n * Math.PI / (spiralsNumber / 2));
    }
    requestId = window.requestAnimationFrame(Draw);
}
requestId = window.requestAnimationFrame(Draw);

function drawSpiral(a, amplitude, phi, frequence, increment) {
    for (var i = 0; i < 100; i++) {
        a += frequence;
        amplitude += 1;
        var _x = Math.cos(a + increment + phi) * amplitude + cw / 2;
        var _y = Math.sin(a + increment + phi) * amplitude + ch / 2;
        ctx.strokeStyle = "hsl(0,70%," + i + "%)";
        drawRect(i / 2, i / 2, _x, _y, Math.PI - a);
    }
}

function drawRect(w, h, X, Y, theta) {
    ctx.beginPath();
    for (var i = 45; i < 360 + 45; i += 90) {
        var a = i * Math.PI / 180;
        var x = X + w * Math.cos(a) * Math.cos(theta) - h * Math.sin(a) * Math.sin(theta);
        var y = Y + w * Math.cos(a) * Math.sin(theta) + h * Math.sin(a) * Math.cos(theta);
        ctx.lineTo(x, y);
    }
    ctx.closePath()
    ctx.stroke();
}