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
    var w = innerWidth;
    var h = innerHeight;
    var dpr = devicePixelRatio;

    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    W = canvas.width = dpr * w;
    H = canvas.height = dpr * h;
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

function concentrics(x, y, radius, step) {
    while (y += step, radius -= step, radius > 0)
        circle(x, y, radius);
}

function ease(t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/*---------------------------------------------------------------------------*/

var t;
var Radius;
var Step;

function init() {
    ctx.globalCompositeOperation = 'xor';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(W / 2, H / 2);
    ctx.fillStyle = 'rgb(253, 227, 167)';

    Radius = floor(min(W, H) / 3);
    Step = Radius / 7;

    t = 0;
}

function draw() {
    ctx.clearRect(-W / 2, -H / 2, W, H);
    circle(0, 0, Radius);
    if (t < 1) {
        concentrics(0, 0, Radius, Step);
        ctx.save();
        ctx.rotate(ease(t) * TAU);
        concentrics(0, 0, Radius, Step);
        ctx.restore();
    }
    if ((t += 0.01) >= 1.1) t = 0;
}

/*---------------------------------------------------------------------------*/

document.onclick = pause;
document.ondblclick = reset;

reset();