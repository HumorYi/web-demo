'use strict';

var _createClass = (function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var PI_TWO = Math.PI * 2;
var TO_RAD = Math.PI / 180;
var circles = [];
var BALLS_PER_CIRCLE = 10;
var RADIUS_LAST_CIRCLE = 40;

canvas.width = 540;
canvas.height = 540;

var center = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

var Ball = (function() {
    function Ball(options) {
        _classCallCheck(this, Ball);

        this.x = options.x;
        this.y = options.y;
        this.initx = this.x;
        this.inity = this.y;
        this.radius = options.radius;
        this.color = options.color;
        this.angle = options.angle;
        this.index = options.index;
        this.angleIncrement = options.angleIncrement;
        this.circleReference = options.circleReference;
    }

    _createClass(Ball, [{
        key: 'update',
        value: function update() {

            this.x = center.x + Math.cos(this.angle) * this.circleReference.radius;
            this.y = center.y + Math.sin(this.angle) * this.circleReference.radius;

            this.angle += this.angleIncrement * TO_RAD;

            this.color += this.angleIncrement;

            //console.log(this.angle * TO_DEG);
        }
    }, {
        key: 'draw',
        value: function draw() {
            ctx.fillStyle = 'hsl(' + this.color + ', 50%, 50%)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, PI_TWO, false);
            ctx.closePath();
            ctx.fill();
        }
    }]);

    return Ball;
})();

var Circle = (function() {
    function Circle(radius, direction, index) {
        _classCallCheck(this, Circle);

        this.balls = [];
        this.radius = radius;
        this.index = index;

        for (var i = 0; i < BALLS_PER_CIRCLE; i++) {
            //already get the angle in radians
            var angle = i / BALLS_PER_CIRCLE * PI_TWO;

            var x = center.x + Math.cos(angle) * radius;
            var y = center.y + Math.sin(angle) * radius;

            this.balls[i] = new Ball({
                x: x,
                y: y,
                angle: angle,
                radius: 4,
                color: i * (0 / this.index / 5),
                index: i,
                angleIncrement: direction,
                circleReference: this
            });
        };
    }

    _createClass(Circle, [{
        key: 'update',
        value: function update() {

            for (var i = 0; i < this.balls.length; i++) {
                this.balls[i].update();
            };
        }
    }, {
        key: 'draw',
        value: function draw() {

            for (var i = 0; i < this.balls.length; i++) {
                this.balls[i].draw();
            };

            if (typeof circles[this.index + 1] != 'undefined') {
                for (var i = 0; i < this.balls.length; i++) {

                    var currentBall = this.balls[i];
                    var nextBall = circles[this.index + 1].balls[i];

                    ctx.strokeStyle = 'hsl(' + this.balls[i].color + ', 50%, 50%)';
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.moveTo(currentBall.x, currentBall.y);
                    ctx.lineTo(nextBall.x, nextBall.y);
                    ctx.closePath();
                    ctx.stroke();
                };
            } else {

                for (var i = 0; i < this.balls.length; i++) {

                    var currentBall = this.balls[i];

                    ctx.strokeStyle = 'hsl(' + this.balls[i].color + ', 50%, 50%)';
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.moveTo(currentBall.x, currentBall.y);
                    ctx.lineTo(canvas.width / 2, canvas.height / 2);
                    ctx.closePath();
                    ctx.stroke();
                };
            }
        }
    }]);

    return Circle;
})();

function init() {

    for (var i = 0; i < 6; i++) {
        var direction = i % 2 == 0 ? 0.5 : -0.5;
        circles[i] = new Circle((i + 1) * RADIUS_LAST_CIRCLE, direction, i);
    };
};

function update() {
    requestAnimationFrame(update);

    ctx.fillStyle = 'rgba(24,24,24, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    };

    for (var i = 0; i < circles.length; i++) {
        circles[i].draw();
    };
};

init();

requestAnimationFrame(update);