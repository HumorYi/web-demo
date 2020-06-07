window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var c = document.getElementById('canv');
c.width = window.innerWidth;
c.height = window.innerHeight;

var $ = c.getContext('2d');

var tri = {
    obj: {
        num: 12,
        step: Math.PI / 60,
        rad: 110
    },

    go: {
        int: 40
    },
    draw_: function($) {
        //removing the global composite 'difference' op will improve performance...but I like the effect, so. 
        $.globalCompositeOperation = 'difference';
        $.beginPath();
        $.strokeStyle = 'hsla(0,5%,15%, 1)';
        $.lineWidth = 8;
        $.moveTo(10, 10);
        $.lineTo(110, 37);
        $.lineTo(37, 110);
        $.closePath();
        $.stroke();

        $.beginPath();
        $.strokeStyle = 'hsla(255,255%,255%,1)';
        $.lineWidth = 3;
        $.moveTo(-5, -5);
        $.lineTo(-105, -32);
        $.lineTo(-32, -105);
        $.closePath();
        $.stroke();

        $.beginPath();
        $.strokeStyle = 'hsla(0,0%,5%,1)';
        $.lineWidth = 8;
        $.moveTo(-10, -10);
        $.lineTo(-115, -42);
        $.lineTo(-42, -115);
        $.closePath();
        $.stroke();

        $.beginPath();
        $.strokeStyle = 'hsla(255,255%,255%,.7)';
        $.lineWidth = 3;
        $.moveTo(-20, -20);
        $.lineTo(-125, -52);
        $.lineTo(-52, -125);
        $.closePath();
        $.stroke();

        $.beginPath();
        $.strokeStyle = 'hsla(255,255%,255%,.7)';
        $.lineWidth = 5;
        $.moveTo(0, 0);
        $.lineTo(100, 27);
        $.lineTo(27, 100);
        $.closePath();
        $.stroke();

        $.beginPath();
        $.strokeStyle = 'hsla(255,255%,255%,.9)';
        $.lineWidth = 6;
        $.moveTo(15, 15);
        $.lineTo(115, 42);
        $.lineTo(42, 115);
        $.closePath();
        $.stroke();
    }
};

function Obj(mid, off_, step) {
    this.mid = mid;
    this.off_ = off_;
    this.step = step;
}

Obj.prototype.draw = function($) {
    this.step += tri.obj.step;
    $.save();
    $.translate(this.mid.x, this.mid.y);
    $.rotate(this.step + this.off_);

    tri.draw_($);

    $.restore();

};

var arr = [];
for (var i = 0; i < tri.obj.num; i++) {

    var t = i * Math.PI * 2 / tri.obj.num;
    arr.push(new Obj({
        x: c.width / 2 + tri.obj.rad * Math.cos(t),
        y: c.height / 2 + tri.obj.rad * Math.sin(t)
    }, t, Math.PI * i * 2));
}

var go = function() {

    $.fillStyle = 'hsla(0,0%,10%,1)';
    $.fillRect(0, 0, c.width, c.height);

    for (var i in arr) {
        arr[i].draw($);
    }
}

var run = function() {
    window.requestAnimFrame(run);
    go();
}

window.addEventListener('resize', function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}, false);

run();