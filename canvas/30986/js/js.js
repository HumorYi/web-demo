var c = document.getElementById('canv');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var $ = c.getContext('2d');

window.addEventListener('resize', function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}, false);

function draw(ang, dst) {
    var rings = 8;
    var col = 63;
    for (var u = 0; u < rings; u++) {
        spc = Math.pow(1.75, (u + 1))
        sd = spc + dst * spc;
        x = w / 2 + Math.cos(ang) * sd;
        y = h / 2 + Math.sin(ang) * sd;
        s = sd / 6;
        var g = $.createRadialGradient(x, y, 0, x, y, s);
        g.addColorStop(0, 'hsla(' + col * u + ',95%,70%,1)');
        g.addColorStop(0.5, 'hsla(' + col * u + ',95%,50%,.8)');
        g.addColorStop(1, 'hsla(' + col * u + ',95%,20%,1)');
        $.fillStyle = g;
        $.beginPath();
        $.arc(x, y, s, 0, Math.PI * 2);
        $.fill();
    }
}
a = 0;

function go() {
    $.fillStyle = 'hsla(0,0%,5%,1)';
    $.fillRect(0, 0, w, h);
    a++;
    var circs = 50;
    var v = 0;
    for (var i = 0; i < circs; i++) {
        ang = a / 100 + i + circs * Math.PI * 2;
        dst = v + (Math.sin(i / circs + Math.PI * 2) +
            1.2 + Math.cos(a / 25 + 3 * i / circs * Math.PI * 10) + 5) / 2;
        draw(ang, dst);
    }
    window.requestAnimationFrame(go);
}
go()