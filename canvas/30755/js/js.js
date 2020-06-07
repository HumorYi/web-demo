// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik M?ller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
// ends requestAnimationFrame polyfill

var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width // = window.innerWidth;
var ch = c.height // = window.innerHeight;
var X = cw / 2;
var Y = ch / 2;
var rMin = 150;
var r = 200;
var R = 300;
var rad = Math.PI / 180;
var num = 15;
var points = 30; // num points over the bezier curve
var speed = 1;
var h = Math.ceil(360 / num);
var a = 0;
var stopped = true;

var qCRy = []; //cuadraticCurves Array

function buildRy(a) {

        for (var i = 1; i <= num; i++) {
            var ap = i * 360 / num;
            //var az = (i-1)*360/num;
            //var az = ap-40;
            var az = ap;
            var p = []; // points on the bezier curve
            qCRy[i - 1] = {
                //the control point moves on a circle
                pcx: (X + r * Math.cos(ap * rad)) + rMin * Math.cos((ap + a) * rad),
                pcy: (Y + r * Math.sin(ap * rad)) + rMin * Math.sin((ap + a) * rad),
                zx: X + R * Math.cos(az * rad),
                zy: Y + R * Math.sin(az * rad)
            }

            for (var k = 0; k <= points; k++) {
                var t = k / points;
                p[k] = {
                    x: (1 - t) * (1 - t) * X + 2 * (1 - t) * t * qCRy[i - 1].pcx + t * t * qCRy[i - 1].zx,
                    y: (1 - t) * (1 - t) * Y + 2 * (1 - t) * t * qCRy[i - 1].pcy + t * t * qCRy[i - 1].zy
                }
            }
            qCRy[i - 1].p = p;
        }
    } // end buildRy

ctx.fillStyle = "rgba(0,0,0,.05)";

function Draw() {
        requestId = window.requestAnimationFrame(Draw);

        if (a < 360) {
            a += speed;
        } else {
            a = 0;
        }

        ctx.fillRect(0, 0, cw, ch);
        // update points	
        buildRy(a);

        //draw the bezier curves
        /*for( var b = 0; b < qCRy.length; b++){
        ctx.moveTo(X,Y);
        ctx.quadraticCurveTo(qCRy[b].pcx,qCRy[b].pcy,qCRy[b].zx,qCRy[b].zy);
        }*/

        //draw the lines between 
        for (var b = 1; b < qCRy.length; b++) {
            ctx.strokeStyle = "hsl(" + (h * b) + ",100%,70%)";
            for (var k = 0; k <= points; k++) {
                ctx.beginPath();
                ctx.moveTo(qCRy[b - 1].p[k].x, qCRy[b - 1].p[k].y);
                ctx.lineTo(qCRy[b].p[k].x, qCRy[b].p[k].y);
                ctx.stroke();
            }
        }

        // draw the last lines 
        ctx.strokeStyle = "hsl(" + (h * num) + ",100%,70%)";
        for (var k1 = 0; k1 <= points; k1++) {
            ctx.beginPath();
            ctx.moveTo(qCRy[num - 1].p[k1].x, qCRy[num - 1].p[k1].y);
            ctx.lineTo(qCRy[0].p[k1].x, qCRy[0].p[k1].y);
            ctx.stroke();
        }

    } // end Draw();

function start() {
    requestId = window.requestAnimationFrame(Draw);
    stopped = false;
}

function stopAnim() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
    }
    stopped = true;
}

window.addEventListener("load", start, false);
//window.addEventListener("resize", Draw,false);
c.addEventListener("click", function() {
    (stopped == true) ? start(): stopAnim();
}, false)