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

var max = 50;
var rad = 200;

var c, $, inc, p;

var c = document.getElementById('canv');
var $ = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var u = 0;

var go = function() {
    upd();
    draw();
}

var upd = function() {
    for (var i = 0; i < max; i++) {
        if (i % 2 == 0) {
            p[i].upd(inc);

        } else {
            p[i].upd(0);
        }
    }
}

var draw = function() {
    u -= .5;
    $.clearRect(0, 0, c.width, c.height);
    $.fillStyle = 'hsla(0,0%,10%,1)';
    $.fillRect(0, 0, w, h);

    var xp1 = (p[0].x + p[max - 1].x) / 2;
    var yp1 = (p[0].y + p[max - 1].y) / 2;
    /*
     first beginPath() set is a shadow mimic - 
     a black underlay, which is not necessary but 
     the canvas shadow attr kills the springiness 
     in FF :/ so using this instead for a lil depth. 
     */
    $.beginPath();
    $.strokeStyle = 'hsla(0,0%,5%,.35)';
    $.lineWidth = 26;
    $.moveTo(xp1, yp1);

    for (var i = 0; i < max - 1; i++) {
        var xp = (p[i].x + p[i + 1].x) / 2;
        var yp = (p[i].y + p[i + 1].y) / 2;

        $.quadraticCurveTo(p[i].x - 2, p[i].y + 2, xp, yp);
    }

    $.quadraticCurveTo(p[i].x, p[i].y, xp1, yp1);
    $.closePath();
    $.stroke();

    //this one is the actual color circle. 
    $.beginPath();
    $.strokeStyle = 'hsla(' + u + ',100%, 50%,1)';
    $.lineWidth = 20;
    $.moveTo(xp1, yp1);

    for (var i = 0; i < max - 1; i++) {
        var xp = (p[i].x + p[i + 1].x) / 2;
        var yp = (p[i].y + p[i + 1].y) / 2;

        $.quadraticCurveTo(p[i].x, p[i].y, xp, yp);
    }

    $.quadraticCurveTo(p[i].x, p[i].y, xp1, yp1);
    $.closePath();
    $.stroke();


}

var set = function() {

    var rot = 360 / max;
    p = [];

    for (var i = 0; i < max; i++) {

        var pt = new Pt(w / 2, h / 2);
        pt.radii = rot * i;
        pt.rad = rad;
        pt.ready();
        p.push(pt);
    }
}

window.addEventListener('mousedown', function() {
    var rnd = (Math.random() * 410) + 10;
    inc = (inc == 0) ? rnd : 0;
}, false);

var ready = function(e) {
    inc = 0;
    set();
    run();
}

var run = function() {
    window.requestAnimFrame(run);
    go();
}
var Pt = function(midX, midY) {
    this.acc = 5;
    this.chng = 1.35;
    this.midX = midX;
    this.midY = midY;
    this.vert = 0;
    this.x, this.y, this.rad, this.radii, this.dia;

    this.ready = function() {
        this.dia = this.rad;
        this.XY();
    }

    this.upd = function(inc) {
        var r = this.dia + inc;
        this.rad = this.getRad(r, this.rad);
        this.XY();
    }

    this.XY = function() {
        var cos = Math.cos(this.radii * (Math.PI / 180)) * this.rad;
        var sin = Math.sin(this.radii * (Math.PI / 180)) * this.rad;

        this.x = cos + this.midX;
        this.y = sin + this.midY;

    }
    this.getRad = function(mv, cur) {
        this.vert = (this.vert + ((mv - cur) / this.acc)) / this.chng;
        return this.vert + cur;
    }
}
window.addEventListener('resize', function() {
    c.width = w = window.innerWidth;
    c.height = h = window.innerHeight;
    set();
}, false);

ready();