console.clear();

var canv = document.getElementById("output"),
    ctx = canv.getContext('2d'),
    fov = 100;

//Constants
var WIDTH = canv.width,
    HEIGHT = canv.height,
    H_WIDTH = canv.width / 2,
    H_HEIGHT = canv.height / 2,
    SPACING = 3;

var pixels = [];

for (var x = -fov; x < fov; x += SPACING) {
    for (var z = -fov; z < fov; z += SPACING) {
        pixels.push({
            x: x,
            y: 30,
            z: z
        });
    }
}

function render() {
    var imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);

    var i = pixels.length;

    while (i--) {
        var pixel = pixels[i];
        var scale = fov / (fov + pixel.z);
        var x2d = pixel.x * scale + H_WIDTH;
        var y2d = pixel.y * scale + H_HEIGHT;

        if (x2d >= 0 && x2d <= WIDTH && y2d >= 0 && y2d <= HEIGHT) {
            var c = (Math.round(y2d) * imageData.width + Math.round(x2d)) * 4;
            imageData.data[c] = 255;
            imageData.data[c + 1] = 255;
            imageData.data[c + 2] = 255;
            imageData.data[c + 3] = 255;
        }
        pixel.z -= 1;
        if (pixel.z < -fov) {
            pixel.z;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

setInterval(render, 1000 / 30);