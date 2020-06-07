var mouseX = 400,
    mouseY = 250;


///////////////////////////////////
var Render = function(ctx) {
    var my = {
            playing: false
        },
        //fps=1000/24,
        renderItems;
    //timer;

    my.add = function(item) {
        renderItems.push(item);
    };

    my.remove = function(item) {
        renderItems.splice(renderItems.indexOf(item), 1);
    };

    my.start = function() {
        //if(!timer){
        //timer=setTimeout(renderTick, fps);
        //}
        my.playing = true;
        requestAnimFrame(renderTick);
    };

    my.stop = function() {
        my.playing = false;
        /*if(timer){
						clearTimeout(timer);						
					}*/
    };

    my.reset = function() {
        renderItems = [];
    };



    function renderTick() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        var l = renderItems.length;
        for (var i = 0; i < l; i++) {
            renderItems[i].draw(context);
        }
        //timer=setTimeout(renderTick, fps);
        if (my.playing) {
            requestAnimFrame(renderTick);
        }

    }

    function init() {
        // shim layer with setTimeout fallback
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( /* function */ callback, /* DOMElement */ element) {
                    window.setTimeout(callback, 1000 / 24);
                };
        })();
        my.reset();
    }

    init();

    return my;
};

///////////////////////////////////	


var Particle = function(x, y, radius) {
    var my = {};
    my.x = x;
    my.y = y;
    my.radius = radius;
    my.inix = x;
    my.iniy = y;
    my.iniradius = radius;
    my.draw = function(context) {
        context.strokeStyle = '#cacaca';
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(my.inix, my.iniy);
        context.lineTo(my.x, my.y);
        context.stroke();
        context.closePath();

        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.beginPath();
        context.moveTo(my.x, my.y);
        context.arc(my.x, my.y, my.radius, 0, Math.PI * 2, false);
        context.fill();


    };

    return my;

};

var FaceParticle = function(x, y, radius) {
    var my = new Particle(x, y, radius);
    var super_draw = my.draw;

    my.draw = function(context) {
        super_draw(context);
        if (my.radius > my.iniradius * 2) {
            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.beginPath();
            context.arc(my.x + my.radius / 3, my.y - my.radius / 30, my.radius / 2, 0, Math.PI * 2, false);
            if (my.radius > my.iniradius * 3) {
                context.arc(my.x - my.radius / 3, my.y - my.radius / 30, my.radius / 3, 0, Math.PI * 2, false);
            }
            context.fill();

            context.fillStyle = "rgba(0, 0, 0, 1)";
            context.beginPath();
            context.arc(my.x + my.radius / 3, my.y - my.radius / 30, my.radius / 8, 0, Math.PI * 2, false);
            context.arc(my.x - my.radius / 3, my.y - my.radius / 30, my.radius / 6, 0, Math.PI * 2, false);
            context.fill();
        }
    };

    return my;
};

///////////////////////////////////
var Grid = function(gridCols, gridRows, radius, margin) {
    var my = {};

    my.update = function() {
        var particle,
            treshold = 100,
            multispeed = 0,
            speed = 50,
            l = my.particles.length;

        for (var i = 0; i < l; i++) {
            particle = my.particles[i];
            var distX = mouseX - particle.x;
            var distY = mouseY - particle.y;
            var dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
            var newradius;

            multispeed = (multispeed + 0.1) < 1 ? multispeed += 0.1 : multispeed;
            particle.x = (particle.x - (distX / dist) * (treshold / dist) * speed * multispeed) - ((particle.x - particle.inix) / 2);
            particle.y = (particle.y - (distY / dist) * (treshold / dist) * speed * multispeed) - ((particle.y - particle.iniy) / 2);
            particle.radius = (particle.radius + (80 / dist) * (80 / dist) * speed * multispeed) - ((particle.radius - particle.iniradius) / 2);
        }
    };

    my.draw = function(context) {
        my.update();
        var l = my.particles.length;
        for (var i = 0; i < l; i++) {
            my.particles[i].draw(context);
        }
    };

    function init() {
        var resetx,
            step;
        my.particles = [];
        for (var i = 0; i < gridCols * gridRows; i++) {
            step = Math.floor(i / gridCols);
            resetx = i - (step * gridCols);
            my.particles.push(new FaceParticle(margin + (radius + margin) * resetx, margin + step * (radius + margin), radius));
        }
    }
    init();

    return my;
};


///////////////////////////////////			
function mousemoveHandler(e) {
    mouseX = e.clientX - e.target.offsetLeft;
    mouseY = e.clientY - e.target.offsetTop;
}

///////////////////////////////////
function init() {
    var grid,
        canvas;

    canvas = document.getElementById('canvas');
    canvas.width = 800; //window.innerWidth;
    canvas.height = 500; //window.innerHeight;
    if (canvas.getContext) {
        canvas.addEventListener('mousemove', mousemoveHandler, false);
        context = canvas.getContext('2d');
        grid = new Grid(canvas.width / 50, canvas.height / 50, 10, 40);
        render = new Render(context);
        render.add(grid);
        render.start();
    }

    document.body.addEventListener('click', function() {
        if (render.playing) {
            render.stop();
        } else {
            render.start();
        }
    }, false);
}

window.onload = init;