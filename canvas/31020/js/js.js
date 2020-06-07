var c = document.getElementById("c");
var ctx = c.getContext("2d");

var cw = c.width = 620,
    cx = cw / 2;
var ch = c.height = 620,
    cy = ch / 2;

var rad = Math.PI / 180;
var angle = rad * 360 / 6;
var offset = 0; // offset angle

var R = 30;
var inner = (Math.sqrt(3) / 2) * R;
var d = R + Math.sin(Math.PI / 6) * R;

var colors = ["#C8C8A9", "#83AF9B", "#76BCAD", "#FE4365", "#FC9D9A", "#F9CDAD", ];

if (typeof ctx.ellipse === 'function') {
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "#333";
}
var points = [];
var L = 1,
    change = false; //layer to animate

function hexagon(r, c) {
    ctx.fillStyle = c.color;
    var offset = c.offset;
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
        ctx.lineTo(c.x + r * Math.cos(offset + angle * i), c.y + r * Math.sin(offset + angle * i));
    }
    ctx.closePath();
    ctx.fill();
}

function layer(num) {
    var r = inner * (2 * (num - 1));

    var o = [];

    o[0] = {}
    o[0].n = 0
    o[0].x = cx + r * Math.cos(30 * rad);
    o[0].y = cy + r * Math.sin(30 * rad);
    o[0].color = colors[num - 1];
    o[0].offset = 0;
    o[0].layer = num;

    for (var i = 1; i <= 6; i++) {

        var n = o.length;

        var olast = {}
        olast.n = n + num - 2
        olast.x = cx + r * Math.cos((60 * i + 30) * rad);
        olast.y = cy + r * Math.sin((60 * i + 30) * rad);
        olast.color = colors[num - 1];
        olast.offset = 0;
        olast.layer = num;

        for (var l = 0; l < num - 2; l++) {

            o[n + l] = {}
            o[n + l].n = n + l
            o[n + l].x = o[n - 1].x - (l + 1) * (o[n - 1].x - olast.x) / (num - 1);
            o[n + l].y = o[n - 1].y - (l + 1) * (o[n - 1].y - olast.y) / (num - 1);
            o[n + l].color = colors[num - 1];
            o[n + l].offset = 0;
            o[n + l].layer = num;

        }

        if (i < 6) {
            o[n + num - 2] = olast;
        }

    }

    points = points.concat(o)
}

function Draw() {
    for (var i = 1; i <= 6; i++) {
        layer(i, colors[i])
    }
    for (var i = 0; i < points.length; i++) {

        hexagon(R + 15, points[i]);
    }
}

Draw();

function Update() {

    ctx.clearRect(0, 0, cw, ch)
    for (var i = 0; i < points.length; i++) {

        if (points[i].layer == L && points[i].offset < Math.PI / 3) {
            points[i].offset += .05;
        } else if (points[i].layer == L && points[i].offset >= Math.PI / 3) {
            points[i].offset = 0;
            change = true;
        }
        hexagon(R + 15, points[i]);
        ctx.globalCompositeOperation = "difference";
    }
    if (change) {
        if (L < 6) {
            L++;
        } else {
            L = 1
        }
        change = false;
    }

    requestId = window.requestAnimationFrame(Update)
}

requestId = window.requestAnimationFrame(Update)