var sw = 600,
    sh = 600,
    isNode = false;

function createCanvas(w, h) {

    var c;
    if (isNode) {
        c = new Canvas(w, h);
    } else {
        c = document.createElement("canvas");
        c.width = w;
        c.height = h;
    }
    var ctx = c.getContext("2d");
    return {
        canvas: c,
        ctx: ctx
    }
}

var bmp = createCanvas(sw, sh);
document.body.appendChild(bmp.canvas);

var cx = sw / 2;
var cy = sh / 2;
var frame = 0;

function newLine() {

    bmp.ctx.clearRect(0, 0, sw, sh);

    bmp.ctx.fillStyle = "#000";
    bmp.ctx.fillRect(cx - 2, cy - 2, 4, 4);

    var rings = 25;
    var dotsPerRing = 10 + Math.sin(frame * 0.0004) * 4;
    var ring = 20 + Math.sin(frame * 0.01) * 4;

    function getArc(point) {
        var perc = point / dotsPerRing;
        var angle = perc * Math.PI * 2;
        var radius = perc * ring;
        return {
            x: cx + Math.sin(angle) * radius,
            y: cy + Math.cos(angle) * radius
        }
    }

    bmp.ctx.beginPath();
    bmp.ctx.lineWidth = ring * 0.7;
    for (var h = 0; h < dotsPerRing * rings; h++) {
        var point = getArc(h - 1);
        if (h == 0) {
            bmp.ctx.moveTo(point.x, point.y);
        } else {
            bmp.ctx.lineTo(point.x, point.y);
        }
    }
    bmp.ctx.stroke();

    frame += 1;
    requestAnimationFrame(newLine)
}

newLine();