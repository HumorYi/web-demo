var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(0,0,0)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function randomPaint(inX, inY) {

    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    var r, g, b;
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
    ctx.lineWidth = 15;
    ctx.moveTo(inX, inY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.3)";
    ctx.lineWidth = 5;
    ctx.moveTo(inX, inY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.lineWidth = 2;
    ctx.moveTo(inX, inY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    setTimeout(function() {
        randomPaint(x, y)
    }, 100);

}
randomPaint(1, 1);