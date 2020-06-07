// *********************************
// * Set up
// *********************************

// Select Canvas
'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var canvas = document.getElementById('canvas');
// Get Canvas's context
var context = canvas.getContext('2d');

// Make width and height equal to tha of the browser window
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// Placeholder for mouse co-ords
var mouseX = undefined;
var mouseY = undefined;

// *********************************
// * Utility Functions
// *********************************

// Get random number between min and max, inclusive
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generates a specified color
function color(hue, sat, light, alpha) {
    return 'hsla(' + hue + ', ' + sat + '%, ' + light + '%, ' + alpha + ')';
}

// Creates fade effect on canvas
function colorFade(alpha) {
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = color(0, 0, 0, alpha);
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'lighter';
}

// Number near the center of the canvas's, x or y
function position(axis) {
    if (axis === 'x') {
        return randomNumber(0, width) - randomNumber(0, height);
    }
    if (axis === 'y') {
        return randomNumber(0, height) - randomNumber(0, width);
    }
}

// *********************************
// * Particle Class
// *********************************

var Particle = (function() {
    function Particle() {
        _classCallCheck(this, Particle);

        // Position of x axis
        this.x = position('x');
        // Position on y axis
        this.y = position('y');
        // Will be used to increment the x and y coordinates (move the particle)
        // stands for velocity of x and velocity of y
        this.vx = 0;
        this.vy = 0;
        // Set radius to random number for varying sized particles
        this.radius = randomNumber(1, 6);
        // Assign each particle a color
        this.color = color(randomNumber(1, 360), 100, 50, 1);
        // Will be used to circulate the particles movement
        this.angle = 0;
        // Speed of movement
        this.speed = 0.05;
        // Mass for gravity pull
        this.mass = 1;
    }

    // Create array of particles

    Particle.prototype.render = function render() {
        // Save state of canvas
        context.save();
        // Begin stroke
        context.beginPath();
        // Draw circular particle
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        // Set fill and stroke colors
        /*        context.fillStyle = this.color;
                context.strokeStyle = this.color;*/

        // Thanks to Matei Copot for this suggestion
        var col = color(this.x / width * 360, 80, 50, .5);
        context.fillStyle = col;
        context.strokeStyle = col;
        // Apply fill and stroke colors
        context.fill();
        context.stroke();
        // restore from saved state
        context.restore();
        // reset values if particle outside of screen
        if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
            this.reset();
        }
    };

    Particle.prototype.update = function update() {
        this.x = this.x + Math.sin(this.angle * this.vx) * this.radius;
        this.y = this.y + Math.sin(this.angle * this.vy) * this.radius;
        this.angle += this.speed;
    };

    // Reset values to original state

    Particle.prototype.reset = function reset() {
        this.x = position('x');
        this.y = position('y');
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.speed = 0.05;
    };

    // Define as static so it can be called without creating an instance of the particle

    Particle.createArray = function createArray(numberOf) {
        // Placeholder for particles
        var array = [];
        // Create as many as given in the argument
        while (numberOf--) {
            // Push new particle to the array
            array.push(new Particle());
        }
        // return the populated array
        return array;
    };

    return Particle;
})();

var particleArr = Particle.createArray(70);

function gravitate(partA, partB) {
    var dx = partB.x - partA.x;
    var dy = partB.y - partA.y;
    var distSQ = dx * dx + dy * dy;
    var dist = Math.sqrt(distSQ) + 40;
    var force = partA.mass * partB.mass / distSQ;
    var ax = force * dx / dist * 2;
    var ay = force * dy / dist * 2;

    partA.vx += ax / partA.mass;
    partA.vy += ay / partA.mass;
    partB.vx -= ax / partB.mass;
    partB.vy -= ay / partB.mass;
}

function move(partA, index) {
    partA.x += partA.vx + 2;
    partA.y += partA.vy + 2;

    var pullX = mouseX ? mouseX + partA.radius : 0;
    var pullY = mouseY ? mouseY + partA.radius : 0;
    var mass = mouseY ? 9 : 2;

    for (var partB = undefined, k = index + 1; k < particleArr.length; k++) {
        partB = {
            x: pullX,
            y: pullY,
            mass: mass
        };
        gravitate(partA, partB);
    }
}

// Self calling function
(function draw() {
    // Continuosly calls itself to create animation frames
    window.requestAnimationFrame(draw);
    // Apply color fade to create nice vis effect
    colorFade(0.07);

    particleArr.forEach(function(_, index) {
        move(_, index);
        // _.update();
        _.render();
    });
})();

// Listens for the resizing of the canvas
window.addEventListener('resize', function() {
    // Update width and height of canvas on resize
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    // Reset particle array to update width and height
    particleArr = Particle.createArray(50);
});

// Listens for mousemove
window.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});