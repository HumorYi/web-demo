var c = document.getElementById("c");
var ctx = c.getContext("2d");
var c_w = c.width = 400;
var c_h = c.height = 250;
var c_x = c_w / 2,
    c_y = c_h / 2;
var rad = Math.PI / 180;
var w = 400;
var h = 250;
var ampl = 30;
var freq = .03;
var phi = 0;
var frames = 0;

ctx.lineWidth = 1;

function Draw() {
    frames++
    phi = frames / 30;
    ctx.clearRect(0, 0, c_w, c_h);

    for (var x = 0; x < w; x += 5) {

        y = c_y + Math.sin(x * freq + phi) * ampl;
        ctx.strokeStyle = "hsl(" + 35 + ",90%,50%)";

        ctx.beginPath();
        ctx.moveTo(c_x, 0)
        ctx.lineTo(x, y - 7);
        ctx.stroke();
        ctx.strokeStyle = "hsl(" + 35 + ",90%,25%)";
        ctx.beginPath();
        ctx.moveTo(c_x, c_h)
        ctx.lineTo(x, y + 7);
        ctx.stroke();
        ctx.fillStyle = "hsl(" + 35 + ",90%,50%)"
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.stroke();
    requestId = window.requestAnimationFrame(Draw);
}
requestId = window.requestAnimationFrame(Draw);