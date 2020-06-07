Object.getOwnPropertyNames(Math).map(function(p) {
    window[p] = Math[p];
});

var rand = function(max, min, is_int) {
    var max = ((max - 1) || 0) + 1,
        min = min || 0,
        gen = min + (max - min) * random();

    return (is_int) ? round(gen) : gen;
};

var Q = function(k) {
    return (random() < (k || .5)) ? -1 : 1;
};

var N = 16,
    squares = [],

    c = document.getElementById('c'),
    ctx = c.getContext('2d'),
    w, h,

    t = 0,
    r_id = null;

var Square = function(l, x, y, A, W) {
    this.l = rand(min(w, h) / 2, 32, 1);
    this.x = x || 0;
    this.y = y || 0;
    this.A = A || rand(2 * PI, 0);
    this.W = W || Q() * rand(PI / 90, PI / 720);

    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.out = false;

    this.move = function() {
        var prev_x = this.x,
            prev_y = this.y;

        if (this.out) {
            this.vx += this.ax;
            this.vy += this.ay;
            this.x += this.vx;
            this.y += this.vy;

            if ((prev_x != 0 || prev_y != 0) &&
                (sign(this.x) != sign(prev_x) ||
                    sign(this.y) != sign(prev_y))) {
                this.x = 0;
                this.y = 0;
                this.vx = 0;
                this.vy = 0;
                this.ax = 0;
                this.ay = 0;
                this.W = Q() * rand(PI / 90, PI / 720);
                this.out = false;
            }
        }
    };

    this.draw = function(ct) {
        var hue = ~~(this.A * 180 / PI);

        ct.save();

        ct.fillStyle = 'hsl(' + hue + ',100%,62%)';
        ct.strokeStyle = 'hsl(' + (hue + 180) + ',100%,71%)';

        ct.translate(this.x, this.y);
        ct.rotate(this.A);

        ct.beginPath();
        ct.rect(-this.l / 2, -this.l / 2,
            this.l, this.l);
        ct.closePath();
        ct.stroke();
        ct.fill();

        ct.restore();
    };
};

var init = function() {
    var s = getComputedStyle(c);

    if (r_id) {
        cancelAnimationFrame(r_id);
        r_id = null;
    }

    squares = [];

    w = c.width = ~~s.width.split('px')[0];
    h = c.height = ~~s.height.split('px')[0];

    ctx.translate(w / 2, h / 2);
    ctx.globalCompositeOperation = 'xor';
    ctx.lineWidth = 8;

    for (var i = 0; i < N; i++) {
        squares.push(new Square());
    }

    draw();
};

var draw = function() {
    if (t % 2 == 0) {
        ctx.clearRect(-w / 2, -h / 2, w, h);

        for (var i = 0; i < N; i++) {
            squares[i].move();
            squares[i].A += squares[i].W;
            squares[i].draw(ctx);
        }
    }

    t++;

    requestAnimationFrame(draw);
};

setTimeout(function() {
    init();

    addEventListener('resize', init, false);

    c.addEventListener('click', function() {
        var v, a, B;

        for (var i = 0; i < N; i++) {
            if (!squares[i].out) {
                v = rand(25, 9);
                B = rand(2 * PI, 0);
                a = -sign(v) * rand(1.6, .125);

                squares[i].vx = v * cos(B);
                squares[i].vy = v * sin(B);
                squares[i].ax = a * cos(B);
                squares[i].ay = a * sin(B);
                squares[i].W *= rand(3.2, 1.6);
                squares[i].out = true;
            }
        }
    }, false);
}, 15);