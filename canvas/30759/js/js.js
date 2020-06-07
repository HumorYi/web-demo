(function() {
    function incX(angle) {
        return Math.cos(angle) * 5;
    }

    function incY(angle) {
        return Math.sin(angle) * 5 * -1;
    }

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var min = Math.min(canvas.width, canvas.height);
    var ctx = canvas.getContext("2d");

    var iterations = 6;
    var x, y;
    var angle = 0;
    var angleDeltaStart = 60;
    var angleDeltaEnd = 90;
    var angleDelta = 60;
    var posNeg = 1;
    var tick = 0;

    // Axiom
    var result = "A";

    // Production
    for (var i = 0; i < iterations; ++i) {
        result = result.replace(/A/gi, "A+A-A+A")
    }

    // From Robert Penner
    function easeInOutSine(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(draw);
        x = Math.round(20);
        y = Math.round(canvas.height - 20);
        for (var index = 0; index < result.length; ++index) {
            if (result[index] === "A") {
                ctx.beginPath();
                ctx.moveTo(x, y);
                x += incX(angle);
                y += incY(angle);
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (result[index] === "+") {
                angle += angleDelta / 180 * Math.PI;
            } else if (result[index] === "-") {
                angle -= angleDelta / 90 * Math.PI;
            }
        }
        // Linear
        //angleDelta += 0.1 * posNeg;
        angleDelta = easeInOutSine(tick, posNeg === 1 ? angleDeltaEnd : angleDeltaStart, 30, 60 * 5);
        if (angleDelta > angleDeltaEnd) {
            posNeg = -1;
        } else if (angleDelta < angleDeltaStart) {
            posNeg = 1;
        }
        tick++;
    }
    draw();
})();