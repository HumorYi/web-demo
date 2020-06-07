var c = document.getElementById("c");
var ctx = c.getContext("2d");

var ch = c.height = window.innerHeight,
    cy = ch / 2;
var cw = c.width = 2 * ch / 3,
    cx = cw / 2;

var rad = (Math.PI / 180);
var kappa = 0.5522847498;

var a = 0;
var R = ch / 3;
var speed = .02;
var D = 2 * R,
    d;
var y = cy + R,
    i = 0;
var phi = 0;
var num = 10;

var cornsilk = Grd(cx, cy, R, 35)
var fillStyle = cornsilk;

function Draw() {

    if (phi >= 1) {
        phi = 0;
        fillStyle = (fillStyle == cornsilk) ? "black" : cornsilk;
    } else {
        phi += speed;
    }

    ctx.clearRect(0, 0, cw, ch);
    for (var i = -num; i < num; i++) {

        d = 2 * Math.sqrt(R * R - (R / num) * (i + phi) * (R / num) * (i + phi));
        y = cy - (i + phi) * (R * .9 / num);

        fillStyle = (fillStyle == cornsilk) ? "black" : cornsilk;
        ctx.fillStyle = fillStyle;
        drawElipse(cx, y, d, d / 2, a)
    }
    requestId = window.requestAnimationFrame(Draw);
}
requestId = window.requestAnimationFrame(Draw);

function drawElipse(cx, cy, W, H, a) {
    var w = W / 2,
        h = H / 2;
    var ox = w * kappa; // desplasamiento horizontal (offset)
    var oy = h * kappa; // desplazamiento vertical (offset)
    var rw = Math.sqrt(oy * oy + w * w);
    var rh = Math.sqrt(ox * ox + h * h);

    //tan a1 = oy/w

    var aw = Math.atan(oy / w);
    var ah = Math.atan(ox / h);

    var x0 = cx + w * Math.cos(a);
    var y0 = cy + w * Math.sin(a);
    var x1 = cx + h * Math.cos(Math.PI / 2 + a);
    var y1 = cy + h * Math.sin(Math.PI / 2 + a);
    var x2 = cx + w * Math.cos(Math.PI + a);
    var y2 = cy + w * Math.sin(Math.PI + a);
    var x3 = cx + h * Math.cos((3 * Math.PI / 2) + a);
    var y3 = cy + h * Math.sin((3 * Math.PI / 2) + a);

    var px1 = cx + rw * Math.cos(aw + a);
    var py1 = cy + rw * Math.sin(aw + a);
    var px2 = cx + rh * Math.cos((Math.PI / 2 - ah) + a);
    var py2 = cy + rh * Math.sin((Math.PI / 2 - ah) + a);
    var px3 = cx + rh * Math.cos((Math.PI / 2 + ah) + a);
    var py3 = cy + rh * Math.sin((Math.PI / 2 + ah) + a);
    var px4 = cx + rw * Math.cos((Math.PI - aw) + a);
    var py4 = cy + rw * Math.sin((Math.PI - aw) + a);
    var px5 = cx + rw * Math.cos((Math.PI + aw) + a);
    var py5 = cy + rw * Math.sin((Math.PI + aw) + a);
    var px6 = cx + rh * Math.cos((3 * Math.PI / 2 - ah) + a);
    var py6 = cy + rh * Math.sin((3 * Math.PI / 2 - ah) + a);
    var px7 = cx + rh * Math.cos((3 * Math.PI / 2 + ah) + a);
    var py7 = cy + rh * Math.sin((3 * Math.PI / 2 + ah) + a);
    var px8 = cx + rw * Math.cos((-aw) + a);
    var py8 = cy + rw * Math.sin((-aw) + a);

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.bezierCurveTo(px1, py1, px2, py2, x1, y1);
    ctx.bezierCurveTo(px3, py3, px4, py4, x2, y2);
    ctx.bezierCurveTo(px5, py5, px6, py6, x3, y3);
    ctx.bezierCurveTo(px7, py7, px8, py8, x0, y0);
    ctx.fill();

}

function Grd(x, y, r, hue) { // hsl(48,100%,93%)
    grd = ctx.createRadialGradient(x - R / 3, y - R / 3, 0, x, y, r);
    grd.addColorStop(0, 'hsl(' + hue + ', 99%,93%)');
    grd.addColorStop(1, 'hsl(' + hue + ', 99%,40%)');
    return grd;
    console.log(grd)
}