var c = document.createElement('canvas'),
    $ = c.getContext('2d'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    t = 0,
    g = 10,
    z = 50;

document.body.appendChild(c);

function init() {
    reset();
    loop();
}

function draw() {
    $.fillStyle = 'rgba(50, 50, 50, 1)';
    $.fillRect(0, 0, w, h);
    for (var i = 0; i < w + z; i++) {
        if (i % g == (t | 0)) {
            $.beginPath();
            $.moveTo(i, Math.cos(i / z) * z + (h / 2));
            $.lineTo(i - z, -Math.sin((i - z) / z) * z + (h / 2));
            $.lineWidth = 1;
            $.strokeStyle = 'rgba(255, 255, 0, 1)';
            $.stroke();
            $.beginPath();
            $.moveTo(i, -Math.cos(i / z) * z + (h / 2));
            $.lineTo(i - z, Math.sin((i - z) / z) * z + (h / 2));
            $.lineWidth = 1;
            $.strokeStyle = 'rgba(255, 255, 255, 1)';
            $.stroke();
        }
    }
    if (t == (g - 1)) t = 0;
    else t += 0.5;
}

function reset() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
}

function loop() {
    requestAnimationFrame(loop);
    draw();
}

window.addEventListener('resize', reset);

init();