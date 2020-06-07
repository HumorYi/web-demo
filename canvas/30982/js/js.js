var c = document.getElementById('canv');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var $ = c.getContext('2d');

window.addEventListener('resize', function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}, false);

function draw(ang, dst) {
    var rings = 19;
    var col = -26;
    for (var u = 0; u < rings; u++) {
        spc = Math.pow(1.35, (u))
        sd = spc + dst * spc;
        x = w / 2 + Math.cos(ang) * sd;
        y = h / 2 + Math.sin(ang) * sd;
        s = sd / 10;
        $.fillStyle = 'hsla(' + col * (u) + ',100%, 50%, 1)';
        $.beginPath();
        $.arc(x, y, s, 0, Math.PI * 2);
        $.fill();
    }
}
a = 0;

function go() {
    $.fillStyle = 'hsla(0,0%,0%,.08)';
    $.fillRect(0, 0, w, h);
    a++;
    var circs = 30;
    var v = 0;

    for (var i = 0; i < circs; i++) {
        ang = a / 100 + i / circs * Math.PI * 2;
        dst = v + (Math.sin(3 * i / circs + Math.PI * 2) +
            1 + Math.cos(a / 15 + 2 * i / circs * Math.PI * 5) + 1) / 2;
        draw(ang, dst);
    }
    window.requestAnimationFrame(go);
}
go()