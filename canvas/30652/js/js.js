;
(function() {
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var rad = function(deg) {
        return (deg * (Math.PI / 180));
    };

    var pointOnCircle = function(x, y, radius, point) {
        var xr = (x + (radius * Math.cos(rad(point))));
        var yr = (y + (radius * Math.sin(rad(point))));

        return {
            x: xr,
            y: yr
        };
    };

    var rand = function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var Canvas = function Canvas() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.fit();
        document.body.appendChild(this.canvas);
    };

    Canvas.prototype.fit = function() {
        this.resize(window.innerWidth, window.innerHeight);
    };

    Canvas.prototype.resize = function(width, height) {
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
    };

    Canvas.prototype.clear = function(fade, opacity) {
        if (fade) {
            this.context.fillStyle = 'rgba(0, 0, 0, ' + opacity + ')';
            this.context.fillRect(0, 0, this.width, this.height);
        } else {
            this.context.clearRect(0, 0, this.width, this.height);
        }
    };

    window.addEventListener('load', function(event) {
        var c = new Canvas(),
            ctx = c.context;

        c.clear(true, 1);

        var radiusOuter = Math.floor((c.height / 2) - 20),
            angleCross = 180,
            crossStep = 1,
            lineCount = 30,
            countStep = 1,
            angleStep = (360 / lineCount),
            hue = 0;

        function anim() {
            requestAnimFrame(anim);

            c.clear(true, 0.3);

            var angle = 0,
                cx = c.width / 2,
                cy = c.height / 2;

            for (var i = 0; i < lineCount; i++) {
                ctx.strokeStyle = 'hsl(' + (hue + (360 * (i / lineCount))) % 360 + ', 100%, 50%)';
                var ra = (10 - rand(0, 20)),
                    p1 = pointOnCircle(cx, cy, radiusOuter + ra, angle),
                    p2 = pointOnCircle(cx, cy, radiusOuter + ra, angle + angleCross);

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.closePath();
                ctx.stroke();

                angle += angleStep;
            }

            angleCross += crossStep;
            if (angleCross >= 300 || angleCross < 60) crossStep *= -1;

            lineCount += countStep;
            if (lineCount >= 90 || lineCount < 30) countStep *= -1;
            angleStep = (360 / lineCount);

            hue = ((hue + 1) % 360);
        };
        anim();

        window.addEventListener('resize', function(event) {
            c.fit();
            radiusOuter = Math.floor((c.height / 2) - 20);
        });
    });
}());