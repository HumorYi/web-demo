set();

function set() {
    var c = document.getElementById("canv");
    var w = c.width = window.innerWidth;
    var h = c.height = window.innerHeight;
    var midX = w / 2;
    var midY = h / 2;
    var $ = c.getContext("2d");
    $.fillStyle = 'hsla(0,0%,5%,1)';
    $.fillRect(0, 0, w, h);
    x = 0;
    y = 0;
    n = 0;

    _w = 10;
    _h = 10;
    arr = [];
    cols = [];
    n = 51;
    md = 4;
    var col;
    cols.push('hsla(0, 0%, 8%, 1)');
    cols.push('hsla(360, 95%, 55%, 1)');
    cols.push('hsla(219, 95%, 25%, 1)');
    cols.push('hsla(48, 95%, 55%, 1)');
    _arr = [];
    midX = midX - (n * _w / 2);
    midY = midY - (n * _h / 2);

    for (var i = 1; i <= n * n; i++) {
        a = 0;
        if (i == ((n + 1) * (n + 1)) / 2 - n) {
            a = 1;
        }
        rect($, _w, _h, x, y, col, a, i);
        x += _w;
        if (i % n == 0) {
            x = 0;
            y += _h;
        }
    }
    run();

    function run() {
        window.requestAnimationFrame(run);
        draw();
    }

    function draw() {
        x = 0;
        y = 0;
        for (var i in arr) {
            _arr[i] = arr[i];
        }

        $.clearRect(0, 0, _w, _h);
        for (i = 1; i <= _arr.length; i++) {
            a = 0;
            if (i % n != 0 &&
                i % n != 1 &&
                i >= 53 &&
                i <= n * n - n + 1) {
                var t = (_arr[i - 1 - 1] +
                    _arr[i + 1 - 1] +
                    _arr[i - n - 1] +
                    _arr[i + n - 1] +
                    (4 * _arr[i - 1])) % md;
                col = cols[(t * 4 / md)];
                a = t;
            }
            rect($, _w, _h, x, y, col, a, i);
            x += _w;
            if (i % n == 0) {
                x = 0;
                y += _h;
            }
        }
    }

    function rect($, _w, _h, x, y, col, a, i) {
        arr[i - 1] = a;
        $.fillStyle = col;
        $.beginPath();
        $.moveTo(midX + x, midY + y);
        $.lineTo(midX + x + _w, midY + y);
        $.lineTo(midX + x + _w, midY + y + _h);
        $.lineTo(midX + x, midY + y + _h);
        $.fill();
        $.closePath();
    }
}

window.addEventListener('resize', function() {
    c.width = w = window.innerWidth;
    c.height = h = window.innerHeight;
}, false);