//I'm working on
var canvas;
var context;
window.onload = function() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    drawBranches(context, canvas.width / 2, canvas.height, 10, 0);
};


function drawBranches(ctx, startX, startY, trunkWidth, level) {
    if (level < 12) {
        var changeX = 100 / (level + 1);
        var changeY = 100 / (level + 1);

        var topRightX = startX + Math.random() * changeX;
        var topRightY = startY - Math.random() * changeY;

        var topLeftX = startX - Math.random() * changeX;
        var topLeftY = startY - Math.random() * changeY;


        /* right branch */

        ctx.beginPath();
        ctx.moveTo(startX + trunkWidth / 4, startY)
        ctx.quadraticCurveTo(startX + trunkWidth / 4, startY - trunkWidth, topRightX, topRightY);
        ctx.lineWidth = trunkWidth;
        ctx.strokeStyle = randomColor();
        ctx.lineCap = "round";
        ctx.stroke();
        /* right branch */

        ctx.beginPath();
        ctx.moveTo(startX - trunkWidth / 4, startY)
        ctx.quadraticCurveTo(startX - trunkWidth / 4, startY - trunkWidth, topLeftX, topLeftY);
        ctx.lineWidth = trunkWidth;
        ctx.lineCap = "round";
        ctx.stroke();

        drawBranches(ctx, topRightX, topRightY, trunkWidth * 0.7, level + 1);
        drawBranches(ctx, topLeftX, topLeftY, trunkWidth * 0.7, level + 1);
    }
}

setInterval(drawAgain, 50);

function drawAgain() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBranches(context, canvas.width / 2, canvas.height, 10, 0);
}

function randomColor() {
    var rgb = 'rgb(' + (Math.floor((255) * Math.random()) + 200) + ',' + (Math.floor((255) * Math.random())) + ',' + (Math.floor((255) * Math.random())) + ')';

    return rgb;
}