var FPS = 60;
var FRAME_MSEC = 1000 / FPS >> 0;
var center_X = 235;
var center_Y = 235;
var max = 220;
var c = document.getElementById("canv");
var $ = c.getContext("2d");
var n = 0;

setInterval(intervalHandler, FRAME_MSEC);


function intervalHandler() {
    $.clearRect(0, 0, 500, 500);

    var prevX = center_X;
    var prevY = center_Y;

    for (var i = 0; i < max; i++) {
        $.beginPath();
        $.lineWidth = 1;
        $.strokeStyle = getColorHSV(i / max * 360 + n * 4000);
        $.moveTo(prevX, prevY);
        $.lineTo(
            prevX = center_X + (i * Math.cos(i + (i * n))), //prevX, prevY values will change structures
            prevY = center_Y + (i * Math.sin(i + (i * n))));
        $.stroke();
    }

    n += .00025; //spin & transform speed control
}

function getColorHSV(h) { //color scheme.
    var ht = (((h %= 360) < 0) ? h + 360 : h) / 60;
    var hi = Math.floor(ht);
    var r, g, b;
    var m = Math.round;
    switch (hi) {
        case 0:
            r = 0xff;
            g = m(0xff * (ht - hi));
            b = 0;
            break;
        case 1:
            g = 0xff;
            r = m(0xff * (1 - (ht - hi)));
            b = 0;
            break;
        case 2:
            g = 0xff;
            b = m(0xff * (ht - hi));
            r = 0;
            break;
        case 3:
            b = 0xff;
            g = m(0xff * (1 - (ht - hi)));
            r = 0;
            break;
        case 4:
            b = 0xff;
            r = m(0xff * (ht - hi));
            g = 0;
            break;
        case 5:
            r = 0xff;
            b = m(0xff * (1 - (ht - hi)));
            g = 0;
            break;
    }
    return "rgb(" + r + ", " + g + ", " + b + ")";
}