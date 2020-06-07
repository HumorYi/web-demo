var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
window.onresize = resize;

function resize() {
    var box = c.getBoundingClientRect();
    c.width = box.width;
    c.height = box.height;
    console.log(c.width, c.height)
}
resize();

var colors = ["rgba(245,193,86,0.8)", "rgba(230,97,107,0.8)", "rgba(92,211,173,0.8)", "rgba(27, 169, 217, 0.8)"];

var light = {
    x: 0,
    y: c.height - 200
}

function Box() {
    this.half_size = Math.floor((Math.random() * 50) + 1);
    this.x = Math.floor((Math.random() * c.width - this.half_size) + 1);
    this.y = Math.floor((Math.random() * 8000) + 1);
    this.r = Math.random() * Math.PI;
    this.color = colors[Math.floor((Math.random() * colors.length))];

    this.diagonal_point = {
        x: c.width * 1.4,
        y: 0
    }

    this.vanising_point = {
        x: c.width / 3,
        y: 0
    }

    this.origin_point = {
        x: 0,
        y: c.height
    }

    this.getDotIn2D = function(g_x, g_y, g_z) {
        var g_z = g_z || 0;
        var dot1 = this.intersection(g_y, c.height, this.vanising_point.x, this.vanising_point.y, this.origin_point.x, this.origin_point.y, this.diagonal_point.x, this.diagonal_point.y);
        var dot2 = this.intersection(dot1.x, dot1.y, c.width, dot1.y, g_x, c.height, this.vanising_point.x, this.vanising_point.y);
        var dot3 = this.intersection(dot2.x, dot2.y, 0, dot2.y, this.origin_point.x, this.origin_point.y, this.vanising_point.x, this.vanising_point.y);
        var dot4 = this.intersection(dot3.x, dot3.y, dot3.x, 0, 0, c.height - g_z, this.vanising_point.x, this.vanising_point.y);
        var dot5 = this.intersection(dot4.x, dot4.y, c.width, dot4.y, dot2.x, dot2.y, dot2.x, 0);
        return {
            x: dot5.x,
            y: dot5.y
        }
    }

    this.getDots = function() {

        var full = (Math.PI * 2) / 4;

        var p1 = {
            x: this.x + this.half_size * Math.sin(this.r),
            y: this.y + this.half_size * Math.cos(this.r),
            z: 0
        };
        var p2 = {
            x: this.x + this.half_size * Math.sin(this.r + full),
            y: this.y + this.half_size * Math.cos(this.r + full),
            z: 0
        };
        var p3 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 2),
            y: this.y + this.half_size * Math.cos(this.r + full * 2),
            z: 0
        };
        var p4 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 3),
            y: this.y + this.half_size * Math.cos(this.r + full * 3),
            z: 0
        };

        return {
            p1: p1,
            p2: p2,
            p3: p3,
            p4: p4
        };
    }

    this.draw = function() {
        var dots = this.getDots();

        // Bottom
        ctx.beginPath();
        ctx.moveTo(this.getDotIn2D(dots.p1.x, dots.p1.y, 1).x, this.getDotIn2D(dots.p1.x, dots.p1.y, 1).y);
        ctx.lineTo(this.getDotIn2D(dots.p2.x, dots.p2.y, 1).x, this.getDotIn2D(dots.p2.x, dots.p2.y, 1).y);
        ctx.lineTo(this.getDotIn2D(dots.p3.x, dots.p3.y, 1).x, this.getDotIn2D(dots.p3.x, dots.p3.y, 1).y);
        ctx.lineTo(this.getDotIn2D(dots.p4.x, dots.p4.y, 1).x, this.getDotIn2D(dots.p4.x, dots.p4.y, 1).y);
        ctx.moveTo(this.getDotIn2D(dots.p1.x, dots.p1.y, 1).x, this.getDotIn2D(dots.p1.x, dots.p1.y, 1).y);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Left
        ctx.beginPath();
        ctx.moveTo(this.getDotIn2D(dots.p2.x, dots.p2.y, 0).x, this.getDotIn2D(dots.p2.x, dots.p2.y, 0).y);
        ctx.lineTo(this.getDotIn2D(dots.p3.x, dots.p3.y, 0).x, this.getDotIn2D(dots.p3.x, dots.p3.y, 0).y);
        ctx.lineTo(this.getDotIn2D(dots.p3.x, dots.p3.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p3.x, dots.p3.y, this.half_size / 1.5).y);
        ctx.lineTo(this.getDotIn2D(dots.p2.x, dots.p2.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p2.x, dots.p2.y, this.half_size / 1.5).y);
        ctx.moveTo(this.getDotIn2D(dots.p2.x, dots.p2.y, 0).x, this.getDotIn2D(dots.p2.x, dots.p2.y, 0).y);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Right
        ctx.beginPath();
        ctx.moveTo(this.getDotIn2D(dots.p1.x, dots.p1.y, 0).x, this.getDotIn2D(dots.p1.x, dots.p1.y, 0).y);
        ctx.lineTo(this.getDotIn2D(dots.p4.x, dots.p4.y, 0).x, this.getDotIn2D(dots.p4.x, dots.p4.y, 0).y);
        ctx.lineTo(this.getDotIn2D(dots.p4.x, dots.p4.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p4.x, dots.p4.y, this.half_size / 1.5).y);
        ctx.lineTo(this.getDotIn2D(dots.p1.x, dots.p1.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p1.x, dots.p1.y, this.half_size / 1.5).y);
        ctx.moveTo(this.getDotIn2D(dots.p1.x, dots.p1.y, 0).x, this.getDotIn2D(dots.p1.x, dots.p1.y, 0).y);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Back
        ctx.beginPath();
        ctx.moveTo(this.getDotIn2D(dots.p1.x, dots.p1.y, 0).x, this.getDotIn2D(dots.p1.x, dots.p1.y, 0).y);
        ctx.lineTo(this.getDotIn2D(dots.p2.x, dots.p2.y, 0).x, this.getDotIn2D(dots.p2.x, dots.p2.y, 0).y);
        ctx.lineTo(this.getDotIn2D(dots.p2.x, dots.p2.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p2.x, dots.p2.y, this.half_size / 1.5).y);
        ctx.lineTo(this.getDotIn2D(dots.p1.x, dots.p1.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p1.x, dots.p1.y, this.half_size / 1.5).y);
        ctx.moveTo(this.getDotIn2D(dots.p1.x, dots.p1.y, 0).x, this.getDotIn2D(dots.p1.x, dots.p1.y, 0).y);
        ctx.fillStyle = this.color;
        ctx.fill();


        // Front
        ctx.beginPath();
        ctx.moveTo(this.getDotIn2D(dots.p4.x, dots.p4.y, 0).x, this.getDotIn2D(dots.p4.x, dots.p4.y, 0).y);
        ctx.lineTo(this.getDotIn2D(dots.p3.x, dots.p3.y, 0).x, this.getDotIn2D(dots.p3.x, dots.p3.y, 0).y);
        ctx.lineTo(this.getDotIn2D(dots.p3.x, dots.p3.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p3.x, dots.p3.y, this.half_size / 1.5).y);
        ctx.lineTo(this.getDotIn2D(dots.p4.x, dots.p4.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p4.x, dots.p4.y, this.half_size / 1.5).y);
        ctx.moveTo(this.getDotIn2D(dots.p4.x, dots.p4.y, 0).x, this.getDotIn2D(dots.p4.x, dots.p4.y, 0).y);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Top
        ctx.beginPath();
        ctx.moveTo(this.getDotIn2D(dots.p1.x, dots.p1.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p1.x, dots.p1.y, this.half_size / 1.5).y);
        ctx.lineTo(this.getDotIn2D(dots.p2.x, dots.p2.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p2.x, dots.p2.y, this.half_size / 1.5).y);
        ctx.lineTo(this.getDotIn2D(dots.p3.x, dots.p3.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p3.x, dots.p3.y, this.half_size / 1.5).y);
        ctx.lineTo(this.getDotIn2D(dots.p4.x, dots.p4.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p4.x, dots.p4.y, this.half_size / 1.5).y);
        ctx.lineTo(this.getDotIn2D(dots.p1.x, dots.p1.y, this.half_size / 1.5).x, this.getDotIn2D(dots.p1.x, dots.p1.y, this.half_size / 1.5).y);
        ctx.fillStyle = this.color;
        ctx.fill();

        if (this.y - this.half_size < -300) {
            this.y = 10000;
        }
    }

    this.drawShadow = function() {
        var dots = this.getDots();
        var angles = [];
        var points = [];

        for (dot in dots) {
            var angle = Math.atan2(200 - dots[dot].y, light.x - dots[dot].x);
            var endX = dots[dot].x + c.width / 2 * Math.sin(-angle - Math.PI / 2);
            var endY = dots[dot].y + c.width / 2 * Math.cos(-angle - Math.PI / 2);
            angles.push(angle);
            points.push({
                endX: endX,
                endY: endY,
                startX: dots[dot].x,
                startY: dots[dot].y
            });
        };

        for (var i = points.length - 1; i >= 0; i--) {
            var n = i == 3 ? 0 : i + 1;
            ctx.beginPath();
            ctx.moveTo(this.getDotIn2D(points[i].startX, points[i].startY).x, this.getDotIn2D(points[i].startX, points[i].startY).y);
            ctx.lineTo(this.getDotIn2D(points[n].startX, points[n].startY).x, this.getDotIn2D(points[n].startX, points[n].startY).y);
            ctx.lineTo(this.getDotIn2D(points[n].endX, points[n].endY).x, this.getDotIn2D(points[n].endX, points[n].endY).y);
            ctx.lineTo(this.getDotIn2D(points[i].endX, points[i].endY).x, this.getDotIn2D(points[i].endX, points[i].endY).y);
            ctx.fillStyle = "#2c343f";
            ctx.fill();
        };
    }

    this.rotate = function() {
        var speed = (500 - this.half_size) / 20;
        this.r += speed * 0.001;
        this.y -= speed;
    }

    this.intersection = function(first_x, first_y, second_x, second_y, third_x, third_y, fourth_x, fourth_y) {
        var d, a, b, numerator1, numerator2, result = {
            x: null,
            y: null
        };
        d = ((fourth_y - third_y) * (second_x - first_x)) - ((fourth_x - third_x) * (second_y - first_y));
        a = first_y - third_y;
        b = first_x - third_x;
        numerator1 = ((fourth_x - third_x) * a) - ((fourth_y - third_y) * b);
        numerator2 = ((second_x - first_x) * a) - ((second_y - first_y) * b);
        a = numerator1 / d;
        b = numerator2 / d;
        result.x = first_x + (a * (second_x - first_x));
        result.y = first_y + (a * (second_y - first_y));
        return result;
    }

    this.test = function() {

    }

}
var boxes = [];
while (boxes.length < 14) {
    boxes.push(new Box());
}

function drawLight() {
    ctx.beginPath();
    ctx.arc(light.x, c.height, 10, 0, 2 * Math.PI);
    gradient = ctx.createRadialGradient(light.x, c.height, 0, light.x, c.height, 10);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    ctx.lineTo(c.width / 3, 0);
    ctx.lineTo(c.width, c.height);
    ctx.lineTo(0, c.height);
    var grd = ctx.createLinearGradient(c.width / 3, 0, c.width / 3, 500);
    grd.addColorStop(0, "#2c343f");
    grd.addColorStop(1, "#394452");
    ctx.fillStyle = grd;
    ctx.fill();


    drawLight()
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].rotate();
        boxes[i].drawShadow();
    }
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].draw();
    };
    requestAnimationFrame(draw);
}

draw();

c.onmousemove = function(e) {
    light.x = e.offsetX == undefined ? e.layerX : e.offsetX;
}