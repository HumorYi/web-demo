var stage = document.getElementById('stage'),
    ctx = stage.getContext('2d'),
    particles = [];


var radius = 2, // how large to draw the particle
    scatter = 00, // how far from the center of the canvas to place the particle
    speed = 5, // how fast the particle should move
    variance = 1, // the maximum number of variance that can occur in directions along an axis (1 = 20 possible amounts)
    count = 361; // how many particles to generate

yPos = (variance * -1) + 0.1;
xPos = (variance * -1) + 0.1;

// set the canvas to the size of the window
stage.width = window.innerHeight;
stage.height = window.innerHeight;

for (var i = 0; i < count; i++) {
    // create a new particle
    var p = {};

    // place the particle in the center, offset by somewhere between -scatter and scatter
    p.x = stage.width / 2 + (Math.random() * (scatter * 2) - scatter);
    p.y = stage.height / 2 + (Math.random() * (scatter * 2) - scatter);

    // set the particle moving at a random direction. Number will always have one decimal place, at most
    p.xVel = speed * xPos;
    p.yVel = speed * yPos;

    xPos = parseFloat(xPos.toFixed(1)) + 0.1;

    if (xPos == 1) {
        xPos = (variance * -1) + 0.1;
        yPos = parseFloat(yPos.toFixed(1)) + 0.1;
    }

    // add the particle to an array
    particles.push(p);
}

// this function runs once a frame
function render() {
    // clear the canvas
    ctx.clearRect(0, 0, stage.width, stage.height);

    // calculate the new positions of, then draw, each particle
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // move the particle along its chosen direction
        p.x += p.xVel;
        p.y += p.yVel;

        // reverse the x or y direction of the particle if it hits the wals
        if (p.x + (radius / 2) > stage.width) p.xVel = Math.abs(p.xVel) * -1;
        if (p.x - (radius / 2) < 0) p.xVel = Math.abs(p.xVel);
        if (p.y + (radius / 2) > stage.height) p.yVel = Math.abs(p.yVel) * -1;
        if (p.y - (radius / 2) < 0) p.yVel = Math.abs(p.yVel);

        // draw the particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
}



// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


(function animloop() {
    requestAnimFrame(animloop);
    render();
})();