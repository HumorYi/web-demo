var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    opts = {

        r: 40,
        lenX: 40,
        lenZ: 20,

        baseY: 90,
        addedY: 60,
        rotationYVel: .005,
        depth: 650,

        waveIncrement: .04,
        waveDistFactor: 1 / 70,
        colorIncrement: 1,

        focalLength: 250,
        vanishPoint: {
            x: w / 2,
            y: h / 2.5
        },
        alphaThreshold: .045
    },
    calc = {

        dx: Math.cos(Math.PI / 6) * opts.r,
        dz: Math.sin(Math.PI / 6) * opts.r,
        Dz: Math.sin(Math.PI / 6) * opts.r + opts.r
    },

    translation = {
        x: -opts.lenX * calc.dx / 2 + calc.dx / 2,
        y: opts.baseY,
        z: -opts.lenZ * calc.Dz / 2 + calc.dz / 2
    },
    rotationYVel = {
        cos: Math.cos(opts.rotationYVel),
        sin: Math.sin(opts.rotationYVel)
    },

    tick = 0,
    colorTick = 0,
    waveTick = 0,

    points = [];

ctx.lineWidth = 2;

function setup() {

    var x, z, n = -1;

    for (var i = 0; i < opts.lenX; ++i) {
        for (var j = 0; j < opts.lenZ; ++j) {

            ++n;

            var point = new Point(
                calc.dx * i + translation.x,
                translation.y,
                calc.Dz * j + calc.dz * ((j + i) % 2) + translation.z
            );

            if (i > 0)
                point.link(points[n - opts.lenZ]);

            if (j > 0 && i > 0 && ((j + i) % 2) === 0)
                point.link(points[n - 1]);

            points.push(point);
        }
    }
}

function Point(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.screen = {};

    this.distanceFromCenter = Math.sqrt(x * x + z * z) * opts.waveDistFactor;
    this.alpha = 1 / (this.distanceFromCenter * 3);
    this.invisible = this.alpha < opts.alphaThreshold;

    this.links = [];
}
Point.prototype.link = function(point) {

    if (point) this.links.push(point);
}
Point.prototype.draw = function() {

    if (this.invisible) return false;

    //rotate on Y
    var x1 = this.x;
    this.x = this.x * rotationYVel.cos - this.z * rotationYVel.sin;
    this.z = this.z * rotationYVel.cos + x1 * rotationYVel.sin;

    //add wave effect
    this.y = opts.baseY + opts.addedY * Math.sin(-this.distanceFromCenter + waveTick);

    //calculate screen position
    var scale = opts.focalLength / (this.z + opts.depth);
    this.screen.x = opts.vanishPoint.x + scale * this.x;
    this.screen.y = opts.vanishPoint.y + scale * this.y;

    //draw
    ctx.strokeStyle = 'hsla(hue,80%,50%,alp)'
        .replace('hue', colorTick + this.distanceFromCenter / opts.waveDistFactor)
        .replace('alp', this.alpha);

    ctx.beginPath();
    for (var i = 0; i < this.links.length; ++i) {
        ctx.moveTo(this.screen.x, this.screen.y);
        ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
    }
    ctx.stroke();
}

function anim() {

    window.requestAnimationFrame(anim);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    ++tick;
    waveTick += opts.waveIncrement;
    colorTick += opts.colorIncrement;

    for (var n = 0; n < points.length; ++n)
        points[n].draw();
}
setup();
anim();