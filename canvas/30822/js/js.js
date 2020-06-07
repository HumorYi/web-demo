var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = window.innerWidth,
    cx = 0;
var ch = c.height = window.innerHeight,
    cy = 0;
var rad = (Math.PI / 180);
var R = 200;
var p = [];

var r1 = R / 10;
var r2 = R;
var p1 = [];

var A = 0;
var f = 6; //frequency
var flag = true;

var left = cw / 2 - R;
var right = cw / 2 + R;

ctx.fillStyle = "rgba(0,0,0,.1)"
ctx.lineWidth = 1;

function Draw(pn, pc, tx) {
    if (A < 360) {
        A += .1;
    } else {
        A = 0;
    }
    a = A * pn;

    ctx.strokeStyle = "hsl(" + A + ",100%,70%)";

    for (var i = 0; i < 360 / f; i++) {
        p1[i] = {}
        var ang = (i * f) + a

        p1[i].x1 = cx + r1 * Math.cos(ang * rad);
        p1[i].y1 = cy + r1 * Math.sin(ang * rad);

        p1[i].px = cx + r2 / 2 * Math.cos((ang + pc) * rad);
        p1[i].py = cy + r2 / 2 * Math.sin((ang + pc) * rad);

        p1[i].x2 = cx + r2 * Math.cos(ang * rad);
        p1[i].y2 = cy + r2 * Math.sin(ang * rad);
    }

    ctx.save();
    ctx.translate(tx, ch / 2);
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var j = 0; j < p1.length; j++) {

        ctx.moveTo(p1[j].x1, p1[j].y1);
        ctx.quadraticCurveTo(p1[j].px, p1[j].py, p1[j].x2, p1[j].y2);
    }
    ctx.stroke();
    ctx.restore();
}

function static() {
    requestId = window.requestAnimationFrame(static);
    ctx.fillRect(-cw / 2, -ch / 2, 2 * cw, 2 * ch);
    Draw(1, 60, left);
    Draw(-1, -60, right);
}


function animation() {

    requestId = window.requestAnimationFrame(animation);

    ctx.fillRect(-cw / 2, -ch / 2, 2 * cw, 2 * ch);

    if (left == cw / 2 - R) {
        flag = true;
        console.log(flag)
    } else if (left == cw / 2) {
        window.cancelAnimationFrame(requestId);
        requestId2 = window.requestAnimationFrame(static);

        if (flag == true) {
            window.setTimeout(function() {
                left -= 10;
                right += 10;
                flag = false;
                window.cancelAnimationFrame(requestId2);
                window.cancelAnimationFrame(requestId);
                requestId = window.requestAnimationFrame(animation);
            }, 2500);
        } else if (flag == false) {
            window.setTimeout(function() {
                left += 10;
                right -= 10;
                flag = true;
                window.cancelAnimationFrame(requestId2);
                window.cancelAnimationFrame(requestId);
                requestId = window.requestAnimationFrame(animation);
            }, 2500);
        }

    } else if (left == cw / 2 + R) {
        flag = false;
    }

    if (flag == true) {
        left++;
        right--;
    } else if (flag == false) {
        left--;
        right++;
    }

    Draw(1, 60, left);
    Draw(-1, -60, right);

}

function start() {

    requestId = window.requestAnimationFrame(animation);
    //stopped = false;

}
window.addEventListener("load", start(), false);