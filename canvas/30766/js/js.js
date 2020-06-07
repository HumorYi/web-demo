var c, $, t;
t = 0;
c = document.getElementById('canv');
$ = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;
$.fillStyle = 'hsla(200, 85%, 20%,1)';

window.addEventListener('resize', function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}, false);

function draw() {
    $.globalCompositeOperaton = 'source-over';
    $.fillStyle = 'hsla(200, 85%, 20%, .1)';
    $.fillRect(0, 0, c.width, c.height);
    $.fill();
    var foo, i, j, r;

    foo = 100 / Math.sin(t) * Math.PI / 3;
    for (i = j = 0; j < 1050; i = ++j) {
        r = 550 * Math.sin(i / foo);

        $.beginPath();
        $.fillStyle = 'hsla(255,255%,255%, 1)';
        $.beginPath();
        $.arc(Math.sin(i) * r * i + (c.width / 2),
            Math.cos(i) * r * i + (c.height / 2),
            1, 0, Math.PI * 2);
        $.fill();

    }
    t += 0.000005;
    return t %= 5;

};
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function run() {
    window.requestAnimFrame(run);
    draw();
}
run();