Object.getOwnPropertyNames(Math).map(function(p) {
    window[p] = Math[p];
});

var rand = function(max, min, isInt) {
    var max = (max === 0 || max) ? max : 1,
        min = min || 0,
        gen = min + (max - min) * random();

    return (isInt) ? (~~gen) : gen;
};

var gcd = function(a, b) {
    if (!b) return a;
    return gcd(b, a % b);
};

var P = 3,
    Q = 1,
    parts, part_size,
    c_static = document.querySelector('.static'),
    c_ani = document.querySelector('.ani'),
    p_el = document.getElementById('p'),
    ptxt_el = document.getElementById('p-txt'),
    w, h, k = .95,
    ctx_s = c_static.getContext('2d'),
    ctx_a = c_ani.getContext('2d'),
    poly, speed_factor = 3,
    t = 0,
    req_id;

var Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;

    this.drawMe = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, 2 * PI);
        ctx.closePath();
        ctx.fill();
    };

    this.connectTo = function(ctx, point) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(point.x, point.y);
        ctx.closePath();
        ctx.stroke();
    };
};

var Polygon = function(p, q, rc, m) {
    var angle, correction, x, y;

    this.p = p || 3;
    this.q = q || 1;
    this.rc = rc || 75;
    this.ca = 2 * PI / this.p;
    this.edge = 2 * this.rc * sin(this.ca / 2);
    this.m = m || 32;
    this.step = this.edge / this.m;
    this.a = (this.p - 2 * this.q) * PI / this.p;
    this.vertices = [];

    for (i = 0; i < p; i++) {
        correction = floor(i / part_size);
        angle = (i * q + correction) * this.ca;

        x = round(this.rc * cos(angle));
        y = round(this.rc * sin(angle));

        this.vertices.push(new Point(x, y));
        this.vertices[i].idx = i;
    }

    this.drawMe = function(ctx) {
        var conn;

        for (var i = 0; i < this.p; i++) {
            conn = ((i + 1) * q % p !== 0) ?
                (i + 1) :
                (floor(i / part_size) * part_size);
            this.vertices[i].connectTo(ctx, this.vertices[conn]);
        }
    };

    this.traceMe = function(ctx) {
        var _t = t / speed_factor,
            idx, f,
            p0, p1, q0, q1,
            hue;

        for (var i = 0; i < parts; i++) {

            for (var j = 0; j < this.m; j++) {
                idx = i * part_size +
                    floor((_t + j) / this.m + i) % part_size;
                p0 = this.vertices[idx];
                p1 = this.nextConnection(idx);

                f = ((_t + j) % this.m) / this.m;
                x = round((1 - f) * p0.x + f * p1.x);
                y = round((1 - f) * p0.y + f * p1.y);

                q0 = new Point(x, y);

                p0 = p1;
                p1 = this.nextConnection(p0.idx);

                x = round((1 - f) * p0.x + f * p1.x);
                y = round((1 - f) * p0.y + f * p1.y);

                q1 = new Point(x, y);

                ctx.strokeStyle = 'hsl(' + (j / this.m * 90 + i / parts * 360 + _t) % 360 + ', 100%, 65%)'
                q0.connectTo(ctx, q1)
            }
        }
    };

    this.nextConnection = function(idx) {
        var base = floor(idx / part_size),
            new_idx = base * part_size + (idx + 1) % part_size;

        return this.vertices[new_idx];
    };
};

var init = function() {
    var s = getComputedStyle(c_static),
        circumradius;

    if (req_id) {
        cancelAnimationFrame(req_id);
    }

    parts = gcd(P, Q);
    part_size = P / parts;

    w = c_static.width = c_ani.width = ~~s.width.split('px')[0];
    h = c_static.height = c_ani.height = ~~s.height.split('px')[0];

    circumradius = ~~(k * min(w, h) / 2);

    poly = new Polygon(P, Q, circumradius);

    ctx_s.translate(w / 2, h / 2);
    ctx_a.translate(w / 2, h / 2);

    ctx_s.strokeStyle = '#fff';

    drawStatic();
    drawAni();
};

var drawStatic = function() {
    poly.drawMe(ctx_s);
};

var drawAni = function() {

    if (t % speed_factor == 0) {
        ctx_a.clearRect(-w / 2, -h / 2, w, h);
        poly.traceMe(ctx_a);
    };

    t++;

    req_id = requestAnimationFrame(drawAni);
};

setTimeout(function() {
    P = p_el.value;
    Q = floor(rand(P / 2, 1));
    init();

    addEventListener('resize', init, false);

    p_el.addEventListener('change', function() {
        ptxt_el.value = ~~this.value;
        P = p_el.value;
        Q = floor(rand(P / 2, 1));
        init();
    }, false);

    ptxt_el.addEventListener('change', function() {
        if (~~this.value < 3) this.value = 3;
        if (~~this.value > 16) this.value = 16;
        p_el.value = ~~this.value;
        P = p_el.value;
        Q = floor(rand(P / 2, 1));
        init();
    }, false);
}, 15);