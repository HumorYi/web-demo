var c = document.querySelector('canvas');
c.width = window.innerWidth;
c.height = window.innerHeight;
var w = c.width;
var h = c.height;
var w2 = c.width / 2;
var h2 = c.height / 2;
var ctx = c.getContext('2d');

var o = 0;
var alpha = .01;
var ripple = 50;
var amp = 10;
var rate = 5;
var twist = .1;
var spacing = 60;
var swirl = 400;
var w3 = (w2 / spacing | 0) * 2 * spacing + spacing / 2;
var h3 = (h2 / spacing | 0) * 2 * spacing + spacing / 2;

ctx.translate(w2, h2);

function frame() {
    var t = Date.now() / 300;
    ctx.fillStyle = 'rgba(0,0,0,' + alpha + ')';
    ctx.fillRect(-w2, -h2, w, h);
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    for (var i = -w3; i <= w3; i += spacing) {
        for (var j = -h3; j <= h3; j += spacing) {
            var p = dist(i, j);
            var n1 = dist(i, j - spacing);
            var n2 = dist(i - spacing, j);
            ctx.beginPath();
            ctx.moveTo(p[0], p[1] - o);
            ctx.lineTo(n1[0], n1[1] + o);
            ctx.moveTo(p[0] - o, p[1]);
            ctx.lineTo(n2[0] + o, n2[1]);
            ctx.stroke();
        }
    }

    function dist(x, y) {
        var d = Math.sqrt(x * x + y * y);
        var a = Math.atan2(y, x);
        var d2 = d + amp * Math.sin(d / ripple - t);
        var a2 = a + twist * Math.sin(d / swirl - t / rate);
        return [Math.cos(a2) * d2, Math.sin(a2) * d2];
    }
    requestAnimationFrame(frame);
}

frame();