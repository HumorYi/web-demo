(function() {

    'use strict';

    function Line(x, y, hue) {
        this.x = x;
        this.y = y;
        this.ox = this.x;
        this.oy = this.y;
        this.hue = hue;
        this.a = Math.random() * 360;
        this.va = Math.random() * 0.2 - 0.1;
        this.vx = Math.random() * 20;
        this.radius = Math.random() * 150;
        this.delay = Math.random() * 100;
    }

    Line.prototype = {
        constructor: Line,
        update: function(ctx) {

            if (this.delay > 0) {
                this.delay--;
                return;
            }

            this.ox = this.x;
            this.oy = this.y;

            this.x += this.vx * Math.random();
            this.vx += Math.random() * 2 - 1;

            this.y = c.height / 2 + Math.sin(this.a += this.va * Math.random()) * this.radius;

            ctx.strokeStyle = 'hsl(' + (this.hue) + ', 100%, 50%)';
            ctx.lineWidth = 1 + Math.cos(this.a) * Math.random() * 5;
            ctx.beginPath();
            ctx.moveTo(this.ox, this.oy);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();

            if (this.x > c.width) {
                this.x = 0;
                this.vx = Math.random() * 20;
                this.hue = Math.random() * 360;
                this.va = Math.random() * 0.2 - 0.1;
            }

            if (this.x < 0) {
                this.x = c.width;
                this.vx = Math.random() * -20;
                this.hue = Math.random() * 360;
                this.va = Math.random() * 0.2 - 0.1;
            }

        }
    };

    var c = document.getElementById('c'),
        ctx = c.getContext('2d');

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    var lines = [],
        maxLines = 100,
        hue = 0,
        hueInc = 360 / maxLines;

    for (var i = 0; i < maxLines; i++) {
        lines.push(new Line(0, c.height / 2, hue += hueInc));
    }

    console.log(lines);

    requestAnimationFrame(function loop() {
        requestAnimationFrame(loop);

        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = 'lighter';

        for (var i = 0, len = lines.length; i < len; i++) {
            lines[i].update(ctx);
        }

        ctx.restore();

    });

})();