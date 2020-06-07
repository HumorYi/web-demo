var c, $, w, h, cnt;
c = document.getElementById('canv');
$ = c.getContext('2d');

w = c.width = window.innerWidth;
h = c.height = window.innerHeight;

cnt = 10;
$.fillStyle = 'hsla(0,0%,0%,1)';


var draw = function() {
    var i, b, arr, _arr, rz, x, y, px, py;
    var pts = Math.cos(Math.PI * 2) / (8 / 2);
    $.globalCompositeOperation = "source-over";
    $.fillRect(0, 0, w, h);
    $.globalCompositeOperation = "xor";
    var dims = 0.85 + Math.sin(cnt / 43) / 15;
    var rot = Math.sin(cnt / 73);

    var _w = w;
    for (b = 0; b < 110; b++) {
        rz = cnt / 45 + b / 5 * rot;
        px = Math.cos(rz / 6) * (b / 40) + 100;
        py = Math.sin(rz / 6) * (b / 40) + 100;
        $.beginPath();
        arr = [];
        for (i = 0; i < 8; i++) {
            x = Math.sin(rz) * _w + c.width / 2;
            y = Math.cos(rz) * _w + c.height / 2 - 50;
            rz += Math.PI * 2 / 8;
            if (i) {
                $.lineTo(x, y);
            } else {
                $.moveTo(x, y);
            }
            arr[i] = [x, y];
        }
        $.fillStyle = 'hsla(0,0%,0%,1)';
        $.closePath();
        $.fill();

        if (b) {
            for (i = 0; i < 8; i++) {
                $.beginPath();
                $.moveTo(arr[i][0], arr[i][1]);
                $.lineTo(_arr[i][0], _arr[i][1]);
                $.fill();
            }
        }

        _arr = [];
        rz += (Math.PI * 2) / (8 / 2);
        for (i = 0; i < 8; i++) {
            x = Math.sin(rz) * _w * pts + 200;
            y = Math.cos(rz) * _w * pts + 200;
            _arr[i] = [x, y];
            rz += (Math.PI * 2) / (8 / 2);
        }
        _w *= dims;
    }
    cnt++;
    window.requestAnimationFrame(draw);
}
window.addEventListener('resize', function() {
    c.width = w = window.innerWidth;
    c.height = h = window.innerHeight;
}, false);
draw();