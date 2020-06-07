var c = document.getElementById("canv");
var $ = c.getContext("2d");
c.width = window.innerWidth / 1.5;
c.height = window.innerHeight / 1.5;
var num = 300;
var rad = 55;
var o = [];
var _o;

function draw() {
    for (var i = 0; i < num; i++) {
        if (o.length < num) o[i] = i / num;
        _o = o[0];
        if (o[i] + 1 / num > 1) o[i] = 0;
        o[i] = o[i] + 0.12 / (.15 + rad);

        $.fillStyle = 'hsla(' + i + 2 + ', 100%, 50%,' + o[i] + ')';
        $.beginPath();
        $.setTransform(Math.cos(rad * (i / 2)), -Math.sin(rad * (i / 2)), -Math.sin(rad * (i / 2)), -Math.cos(rad * (i / 2)),
            c.width / 2, c.height / 2);
        $.fillRect(num * 2 * o[i - 1] - 1, num * o[i - 1] - 1, c.width, c.height);
        $.fill();
    }
};

window.addEventListener('resize', function() {
    c.width = window.innerWidth / 1.5;
    c.height = window.innerHeight / 1.5;
}, false);

run();

function run() {
    window.requestAnimationFrame(run);
    draw();
}