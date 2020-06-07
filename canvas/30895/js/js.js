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

var c = document.getElementById('canv');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;

window.addEventListener('resize', function() {
    c.width = w = window.innerWidth;
    c.height = h = window.innerHeight;
}, false);

var $ = c.getContext('2d');
var u;

var draw = function(ang, dst) {
    var rings = 24;
    u = -5;
    for (var i = 0; i < rings; i++) {
        spc = Math.pow(1.1, (i))
        sd = spc + dst * spc * 5;
        x = w / 2 + Math.cos(ang) * sd;
        y = h / 2 + Math.sin(ang) * sd;
        s = sd / 44;
        $.globalCompositeOperation = 'lighter';
        $.fillStyle = "hsla(" + (i / u * 360) + ",95%, 50%, 1)"
        $.beginPath();
        $.arc(x, y, s * 4.2, 0, Math.PI * 2);
        $.fill();

    }
}
a = 0;

var go = function() {
    $.clearRect(0, 0, w, h);
    a++;
    var circs = 40;
    var v = 0;

    for (var i = 0; i < circs; i++) {
        ang = a / 180 + i / circs * Math.PI * 2;
        dst = v + (Math.sin(5 * i / circs * Math.PI * 2) +
            2 + Math.sin(a / 8 + 5 * i / circs * Math.PI * 2) + 2);
        draw(ang, dst);
    }
    window.requestAnimFrame(go);
}
go()