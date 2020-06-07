var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;

ctx.fillStyle = "#ff0000";

function myFunc(x) {
    return 1 / Math.tan(4 * x + Math.cos(param / 150) * 5) * Math.cos(param / 50) * 70 + 150;
}

function myFunc2(x) {
    return Math.tan(4 * x + Math.cos(param / 150) * 5) * Math.tan(param / 50) * 100 + 250;
}

function myFunc3(x, p) {
    return Math.tan(30 * x) * 10 + 200;
}

var param = 0;

function graphPolar(func, color) {
    for (var x = 0; x < 2 * Math.PI; x += 0.01) {
        var color = Math.round(((Math.cos(param / 200) + 1) / 2) * 111111 + 888888);
        color = "ff3366";
        ctx.fillStyle = "#" + color;
        ctx.fillRect(Math.cos(x) * func(x) + canvas.width / 2,
            Math.sin(x) * func(x) + canvas.height / 2, 1, 1);
    }
}

function clear() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function paramMover() {
    clear();
    param++;
    graphPolar(myFunc);
    graphPolar(myFunc2);
    //graphPolar(myFunc3);
}

setInterval(paramMover, 10);