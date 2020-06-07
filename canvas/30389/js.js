// dropdown gui
var gui_function = function() {
    this.distance = 100;
    this.color = "#000000";
}
window.onload = function() {
    var text = new gui_function();
    var gui = new dat.GUI();
    gui.add(text, 'distance', 10, 200).onChange(function(newValue) {
        param.distance = newValue;
    });
    gui.addColor(text, 'color').onChange(function(newValue) {
        param.color = newValue;
    });
};

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function draw(param, ctx) {
    ctx.fillStyle = param.color;
    for (var i = 0; i < param.number; i++) {
        ctx.beginPath();
        ctx.arc(param.x + (param.distance) * Math.cos(360 / param.number * i * Math.PI / 180 + param.diff_x[i]), param.y + (param.distance) * Math.sin(360 / param.number * i * Math.PI / 180 + param.diff_y[i]), param.radius[i], 0, 2 * Math.PI);
        ctx.globalCompositeOperation = 'xor';
        ctx.fill();
    }
}

bool = 0;

function animate(param, canvas, ctx) {

    if (param.radius[0] < 100 && parseInt(bool) < 912) {
        for (var i = 0; i < param.number; i++)
            param.radius[i] += (0.5 * (param.number + 1) / 18);
    } else if (parseInt(param.radius[0]) === 100 && parseInt(bool) < 50)
        bool++;
    else if (parseInt(param.radius[0]) === 100 && parseInt(bool) < 962) {
        for (var i = 0; i < param.number; i++) {
            if (i % 4 == 0) {
                param.diff_x[i] += 0.6 * Math.PI / 180;
                param.diff_y[i] += 0.6 * Math.PI / 180;
            } else if (i % 4 == 1) {
                param.diff_x[i] += 0.4 * Math.PI / 180;
                param.diff_y[i] += 0.4 * Math.PI / 180;
            } else if (i % 4 == 2) {
                param.diff_x[i] += 0.2 * Math.PI / 180;
                param.diff_y[i] += 0.2 * Math.PI / 180;
            }
            bool += 0.5;
        }
    } else if (parseInt(param.radius[0]) == 100) {
        for (var i = 0; i < param.number; i++)
            param.radius[i] = 0;
    } else if (parseInt(bool) < 1000)
        bool++;
    else {
        for (var i = 0; i < param.number; i++) {
            param.diff_x[i] = 0;
            param.diff_y[i] = 0;
        }
        bool = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(param, ctx);

    requestAnimFrame(function() {
        animate(param, canvas, ctx);
    });
}
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var param = {
    x: 400,
    y: 400,
    distance: 100,
    number: 24,
    radius: [],
    color: "black",
    diff_x: [],
    diff_y: []
};

for (var i = 0; i < param.number; i++) {
    param.radius[i] = 0;
    param.diff_x[i] = 0;
    param.diff_y[i] = 0;
}
draw(param, ctx);
animate(param, canvas, ctx);