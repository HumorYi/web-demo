var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

'floor|random|round|abs|sqrt|PI|atan2|sin|cos|pow|max|min'
.split('|')
    .forEach(function(p) {
        window[p] = Math[p];
    });

var TAU = PI * 2;

function r(n) {
    return random() * n;
}

function rint(lo, hi) {
    return lo + floor(r(hi - lo + 1))
}

function choose() {
    return arguments[rint(0, arguments.length - 1)];
}

/*---------------------------------------------------------------------------*/

var W, H, frame, t0, time;

function resize() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
}

function loop(t) {
    frame = requestAnimationFrame(loop);
    draw();
    time++;
}

function pause() {
    cancelAnimationFrame(frame);
    frame = frame ? null : requestAnimationFrame(loop);
}

function reset() {
    cancelAnimationFrame(frame);
    resize();
    ctx.clearRect(0, 0, W, H);
    init();
    time = 0;
    frame = requestAnimationFrame(loop);
}

/*---------------------------------------------------------------------------*/

function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
}

function line(x1, y1, x2, y2, w) {
    if (!w) return;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function concentrics(x, y, radius, step) {
    while (y += step, radius -= step, radius > 0)
        circle(x, y, radius);
}

function dot(r, t) {
    t = t < 0 ? 0 : t > 1 ? 1 : ease(t);
    var y = r * (t * 2 - 1);
    circle(0, y, 5);
    line(0, 0, 0, y, 5 * (1 - abs(y) / r));
}

function ease(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

/*---------------------------------------------------------------------------*/

var t, dt;
var Radius;
var dots;

function init() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(W / 2, H / 2);

    Radius = floor(min(W, H) / 2.5);
    dots = [];
    initDots();

    t = 0;
    dt = 0.01;

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
}

function initDots() {
    for (var i = 0; i < 64; i++) dots[i] = -i / 64;
}

function draw() {
    ctx.clearRect(-W / 2, -H / 2, W, H);
    ctx.save();
    ctx.rotate(t * PI);
    for (var i = 0; i < dots.length; i++) {
        ctx.save();
        ctx.rotate(i * TAU / dots.length);
        dot(Radius, dots[i]);
        dots[i] += dt;
        ctx.restore();
    }
    ctx.restore();
    if ((t += dt) >= 2) {
        t = 0;
        initDots();
    }
}

/*---------------------------------------------------------------------------*/

document.onclick = pause;
document.ondblclick = reset;

reset();