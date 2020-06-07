var c = document.getElementById("c");
var ctx = c.getContext("2d");

var cw = c.width = window.innerWidth,
    cx = cw / 2;
var ch = c.height = window.innerHeight,
    cy = ch / 2;

var rad = Math.PI / 180;
var angle = rad * 360 / 6,
    aSin = 0;
var offset = 0; // offset angle used to rotate

var R = 30,
    inner = (Math.sqrt(3) / 2) * R;
r1 = 20;
var speed = .1;

ctx.lineWidth = 7;
ctx.fillStyle = "rgba(0,0,0,1)"

var colors = ["#F57D7E", "#EF5770", "#EC3A62", "#C53464", "#8C215C", "#712776"];
var points = [];
var L = 1,
    change = false; //layer to animate & flag

function hexagon(r, c) { // draw a hexagon star
    ctx.strokeStyle = c.color;
    var offset = c.offset;
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
        ctx.lineTo(c.x + r * Math.cos(offset + angle * i), c.y + r * Math.sin(offset + angle * i));
        ctx.lineTo(c.x + c.r1 * Math.cos(offset + Math.PI / 6 + angle * i), c.y + c.r1 * Math.sin(offset + Math.PI / 6 + angle * i));

    }
    ctx.closePath();
    //ctx.fill();
    ctx.stroke();
}

function layer(num) { // draw a layer of hexagons; num = nth layer
    var r = inner * (2 * (num - 1));

    var o = [];

    o[0] = {}
    o[0].n = 0
    o[0].x = cx + r * Math.cos(30 * rad);
    o[0].y = cy + r * Math.sin(30 * rad);
    o[0].color = colors[num - 1];
    o[0].layer = num;

    for (var i = 1; i <= 6; i++) {

        var n = o.length;

        var olast = {}
        olast.n = n + num - 2
        olast.x = cx + r * Math.cos((60 * i + 30) * rad);
        olast.y = cy + r * Math.sin((60 * i + 30) * rad);
        olast.color = colors[num - 1];
        olast.layer = num;

        for (var l = 0; l < num - 2; l++) {

            o[n + l] = {}
            o[n + l].n = n + l
            o[n + l].x = o[n - 1].x - (l + 1) * (o[n - 1].x - olast.x) / (num - 1);
            o[n + l].y = o[n - 1].y - (l + 1) * (o[n - 1].y - olast.y) / (num - 1);
            o[n + l].color = colors[num - 1];
            o[n + l].layer = num;

        }

        if (i < 6) {
            o[n + num - 2] = olast;
        }

    }

    points = points.concat(o)
}

function Draw() { // build the points array & draw hexagons	 
    for (var i = 1; i <= 6; i++) {
        layer(i, colors[i])
    }
    for (var i = 0; i < points.length; i++) {
        points[i].r1 = 2 * R / 3;
        points[i].aSin = 0;
        points[i].offset = 0;
        hexagon(R, points[i]);
        ctx.globalCompositeOperation = "difference";
    }
}
Draw();

function Update() {

    ctx.clearRect(0, 0, cw, ch)
    for (var i = 0; i < points.length; i++) {

        if (points[i].layer == L) {

            animateHexagon(points[i])

        }
        hexagon(R, points[i]);
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

/*
function animateHexagon(c){
	if(c.offset < Math.PI/3)
	{c.offset+=.05;}
	else if(c.offset >= Math.PI/3)
	{c.offset = 0; change = true;}
}*/
function animateHexagon(c) {
    if (c.aSin < Math.PI) {
        c.aSin += speed * L / 3;
    } else if (c.aSin >= Math.PI) {
        c.aSin = 0;
        change = true;
    }

    c.r1 = r1 + Math.sin(c.aSin) * 25;

}