var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    opts = {
        baseHalfSize: 62,
        baseDetatchement: 30, // can't find the exact value for the detatchement
        topHalfSize: 5, // also making this one up
        height: 324, // actual proportions according to the wiki
        splits: 20, // the number of points will be splits*16
        steepnessFactor: 1, // must be between 0 and Math.PI / 2 not including

        floors: [{
            layer: 4,
            height: 2
        }, {
            layer: 8,
            height: 2
        }],

        rotYVel: .01,

        translate: {
            x: 0,
            y: 150,
            z: 250
        },
        focalLength: 250,
        vanishPoint: {
            x: w / 2,
            y: h / 2
        }
    },

    rotY = 0,
    cos = 1,
    sin = 0,

    points = [];

for (var i = 0; i < opts.splits; ++i) {
    var linear = i / opts.splits,

        // multiplier = Math.sin( linear * Math.PI / 2 )
        // multiplier must be between 0 and 1.
        // multiplier is 1 when linear is 1
        // multiplier is 0 when linear is 0
        // but multiplier is Math.sin( stF ) when linear is 0
        // subtract sin( stF ) and multiplier is 0 when linear is 0
        // but now multiplier is 1 - sin( stF ) when linear is 1
        // so we need to multiply the multiplier in order to get a value between 0 and 1
        // to do that we do a bit of magic with equations
        multiplier = (Math.sin(opts.steepnessFactor + linear * (Math.PI / 2 - opts.steepnessFactor)) - Math.sin(opts.steepnessFactor)) / (1 - Math.sin(opts.steepnessFactor));

    getLegLayer(linear, multiplier, 1, 1);
    getLegLayer(linear, multiplier, 1, -1);
    getLegLayer(linear, multiplier, -1, 1);
    getLegLayer(linear, multiplier, -1, -1);
}

function getLegLayer(linear, multiplier, x, z) {

    // part 1
    points.push(new Point(
        x * ((opts.baseHalfSize - opts.baseDetatchement) + multiplier * (opts.baseDetatchement - opts.baseHalfSize)), -linear * opts.height,
        z * (opts.baseHalfSize + multiplier * (opts.topHalfSize - opts.baseHalfSize))
    ));
    // part 2
    points.push(new Point(
        x * (opts.baseHalfSize + multiplier * (opts.topHalfSize - opts.baseHalfSize)), -linear * opts.height,
        z * (opts.baseHalfSize + multiplier * (opts.topHalfSize - opts.baseHalfSize))
    ));
    // part 3
    points.push(new Point(
        x * (opts.baseHalfSize + multiplier * (opts.topHalfSize - opts.baseHalfSize)), -linear * opts.height,
        z * ((opts.baseHalfSize - opts.baseDetatchement) + multiplier * (opts.baseDetatchement - opts.baseHalfSize))
    ));
    // part 4
    points.push(new Point(
        x * ((opts.baseHalfSize - opts.baseDetatchement) + multiplier * (opts.baseDetatchement - opts.baseHalfSize)), -linear * opts.height,
        z * ((opts.baseHalfSize - opts.baseDetatchement) + multiplier * (opts.baseDetatchement - opts.baseHalfSize))
    ));
}

function Point(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.connections = [];
}
Point.prototype.link = function(link) {

    this.connections.push(link);
}
Point.prototype.update = function() {

    var x = this.x,
        y = this.y,
        z = this.z;

    // apply rotation on the y
    var X = x;
    x = x * cos - z * sin;
    z = z * cos + X * sin;

    // translate
    x += opts.translate.x;
    y += opts.translate.y;
    z += opts.translate.z;

    // find screen position
    var scale = opts.focalLength / z;
    this.sx = opts.vanishPoint.x + x * scale;
    this.sy = opts.vanishPoint.y + y * scale;
}
Point.prototype.render = function() {

    for (var i = 0; i < this.connections.length; ++i) {
        ctx.moveTo(this.sx, this.sy);
        ctx.lineTo(this.connections[i].sx, this.connections[i].sy);
    }
}

// now you gotta link them
// iterate for every layer
for (var i = 0; i < points.length; i += 16) {

    // iterate for every leg
    for (var j = 0; j < 16; j += 4) {

        // iterate for every part
        for (var k = 0; k < 4; ++k) {

            var n = i + j + k;
            points[n].link(points[i + j + ((k + 1) % 4)]);

            if (i < points.length - 16) {
                points[n].link(points[(i + 16) + j + k]);

                points[n].link(points[(i + 16) + j + ((k + 1) % 4)]);
                points[n].link(points[(i + 16) + j + ((k + 3) % 4)]);
            }
        }
    }
}
// some more specific connections to make the floors
for (var i = 0; i < opts.floors.length; ++i) {

    var floor = opts.floors[i];

    for (var j = 0; j < floor.height; ++j) {

        // side 1
        points[(j + floor.layer) * 16 + 1].link(points[(j + floor.layer) * 16 + 5]);

        if (j + 1 < floor.height)
            points[(j + floor.layer) * 16 + 1].link(points[(j + 1 + floor.layer) * 16 + 5]);

        if (j - 1 >= 0)
            points[(j + floor.layer) * 16 + 1].link(points[(j - 1 + floor.layer) * 16 + 5]);

        // side 2
        points[(j + floor.layer) * 16 + 5].link(points[(j + floor.layer) * 16 + 13]);

        if (j + 1 < floor.height)
            points[(j + floor.layer) * 16 + 5].link(points[(j + 1 + floor.layer) * 16 + 13]);

        if (j - 1 >= 0)
            points[(j + floor.layer) * 16 + 5].link(points[(j - 1 + floor.layer) * 16 + 13]);

        // side 3
        points[(j + floor.layer) * 16 + 13].link(points[(j + floor.layer) * 16 + 9]);

        if (j + 1 < floor.height)
            points[(j + floor.layer) * 16 + 13].link(points[(j + 1 + floor.layer) * 16 + 9]);

        if (j - 1 >= 0)
            points[(j + floor.layer) * 16 + 13].link(points[(j - 1 + floor.layer) * 16 + 9]);

        // side 1
        points[(j + floor.layer) * 16 + 9].link(points[(j + floor.layer) * 16 + 1]);

        if (j + 1 < floor.height)
            points[(j + floor.layer) * 16 + 9].link(points[(j + 1 + floor.layer) * 16 + 1]);

        if (j - 1 >= 0)
            points[(j + floor.layer) * 16 + 9].link(points[(j - 1 + floor.layer) * 16 + 1]);
    }
}

function anim() {

    window.requestAnimationFrame(anim);

    rotY += opts.rotYVel;
    sin = Math.sin(rotY);
    cos = Math.cos(rotY);

    points.map(function(point) {
        point.update();
    });

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = .3;
    ctx.beginPath();
    points.map(function(point) {
        point.render();
    });
    ctx.stroke();
}
anim();

window.addEventListener('resize', function() {

    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;

    opts.vanishPoint.x = w / 2;
    opts.vanishPoint.y = h / 2;
});