var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    W = canvas.width = window.innerWidth,
    H = canvas.height = window.innerHeight;

//0 = left 1 = right
var path = [1];
var newPath = [];
var iterC = 0;
//0
//0 0 1
//001 0 011
//0010011 0 0011011

var iterTime = 0;
var lastFrame = -1;

function iterate() {
    newPath = [];
    for (var i = path.length - 1; i >= 0; i--) {
        newPath.push(1 - path[i]);
    }
    console.log(newPath);
}

function saveIter() {
    path.push(0);
    path = path.concat(newPath);
    console.log(path);
    newPath = [];
}

function draw() {
    var scale = 20 / Math.pow(1 + 2 * iterC + 2 * (iterTime / 1000.0), 1.2);
    ctx.save();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "#ff0000";

    ctx.translate(W / 2, H / 2);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(0, 0);

    var x = 0,
        y = 0;
    var dir = 0,
        dirX = [1, 0, -1, 0],
        dirY = [0, -1, 0, 1];
    for (var i = 0; i <= path.length; i++) {
        x += dirX[dir] * 10;
        y += dirY[dir] * 10;
        ctx.lineTo(x, y);
        if (i != path.length)
            dir += 1 - 2 * path[i];
        else
            dir += 1;
        dir = (dir + 4) % 4;
    }

    ctx.stroke();
    ctx.restore();
    if (newPath.length > 0) {
        ctx.save();
        ctx.strokeStyle = "#ff0000";

        ctx.translate(W / 2, H / 2);
        ctx.scale(scale, scale);
        ctx.translate(x, y);
        ctx.rotate(-1 / 2 * Math.PI * (1 - iterTime / 1000.0));
        ctx.beginPath();
        x = y = 0;
        ctx.moveTo(0, 0);
        for (var i = 0; i <= newPath.length; i++) {
            x += dirX[dir] * 10;
            y += dirY[dir] * 10;
            ctx.lineTo(x, y);
            if (i != newPath.length)
                dir += 1 - 2 * newPath[i];
            else
                dir += 1;
            dir = (dir + 4) % 4;
        }
        ctx.stroke();
        ctx.restore();
    }
}



function runLoop() {
    var delta = 0;
    var ctime = new Date().getTime();
    if (lastFrame > 0)
        delta = ctime - lastFrame;
    lastFrame = ctime;
    iterTime += delta;
    if (iterTime >= 1000) {
        iterC++;
        iterTime = 0;
        saveIter();
        if (iterC > 15) {
            path = [0];
            iterC = 0;
            newPath = [];
        }
        iterate();
    }
    requestAnimationFrame(draw);
}

iterate();
//saveIter();

//runLoop();

setInterval(runLoop, 30);