var s = c.width = c.height = 500,
    ctx = c.getContext('2d'),

    opts = {

        rings: 18,
        ringRadius: 100,
        totalRadius: 120,
        ringThickness: 5,
        ringExistanceSpan: Math.PI,
        ringSpeed: .03,
        ringApproximationSteps: 20,
        depth: 320,
        rotYVel: -.004,
        vanishPoint: {
            x: s / 2,
            y: s / 2
        },
        focalLength: 250
    },

    ringRot = {
        value: 0,
        cos: 1,
        sin: 0
    },

    ringBaseRadian = (Math.PI * 2) / opts.rings,
    rotY = Math.PI, // to solve some quirkiness in % not getting negative values
    rings = [];

function Ring(num) {

    this.points = [];
    this.num = num;
    this.color = 'hsla(hue,80%,50%,.7)'.replace('hue', num / opts.rings * 360);

    var baseRadian = ringBaseRadian * num;

    // going towards the convergence point
    for (var i = 0; i < opts.ringApproximationSteps; ++i) {

        var thickness = i / opts.ringApproximationSteps * opts.ringThickness,
            radian = baseRadian + (i / opts.ringApproximationSteps) * opts.ringExistanceSpan,
            x = (opts.ringRadius + thickness) * Math.cos(radian),
            y = (opts.ringRadius + thickness) * Math.sin(radian);

        this.points.push(new Point(x, y));
    }
    //going back to the start
    for (var i = opts.ringApproximationSteps - 1; i > 0; --i) {

        var thickness = i / opts.ringApproximationSteps * opts.ringThickness,
            radian = baseRadian + (i / opts.ringApproximationSteps) * opts.ringExistanceSpan,
            x = (opts.ringRadius - thickness) * Math.cos(radian),
            y = (opts.ringRadius - thickness) * Math.sin(radian);

        this.points.push(new Point(x, y));
    }
}
Ring.prototype.draw = function() {

    ctx.fillStyle = this.color;
    ctx.beginPath();

    var radian = rotY + this.num * ringBaseRadian,
        cos = Math.cos(radian),
        sin = Math.sin(radian);

    for (var i = 0; i < this.points.length; ++i) {

        var point = this.points[i],

            x = point.x,
            y = point.y,
            z = 0;

        // rotate according to ring rotation, on the Z
        var x1 = x;
        x = x * ringRot.cos - y * ringRot.sin;
        y = y * ringRot.cos + x1 * ringRot.sin;

        // translate on the X to get the ring in position
        x += opts.totalRadius;

        // rotate according to ring position, on the Y
        z = -x * sin; // should be 'z * cos + that', but z = 0
        x = x * cos; // should be 'that + z * sin', but z = 0

        // translate on the Z according to world position
        z += opts.depth;

        // calculate screen positions
        var scale = opts.focalLength / z,
            screenX = opts.vanishPoint.x + scale * x,
            screenY = opts.vanishPoint.y + scale * y;

        if (i === 0) {

            ctx.moveTo(screenX, screenY);
            point.z = z;

        } else
            ctx.lineTo(screenX, screenY);

    }
    ctx.fill();
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function anim() {

    window.requestAnimationFrame(anim);

    ctx.clearRect(0, 0, s, s);

    ringRot.value += opts.ringSpeed;
    ringRot.cos = Math.cos(ringRot.value);
    ringRot.sin = Math.sin(ringRot.value);

    rotY += opts.rotYVel;

    rings.sort(function(a, b) {
        return b.points[0].z - a.points[0].z
    });
    rings.map(function(ring) {
        ring.draw();
    });
}

for (var i = 0; i < opts.rings; ++i)
    rings.push(new Ring(i));

anim();