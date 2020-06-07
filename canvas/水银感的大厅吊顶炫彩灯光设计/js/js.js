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
 var i = 0;
 var tri = {
    obj: {
        num: 38,
        step: Math.PI / 190,
        rad: 100
    },
    draw_: function($) {
        $.globalCompositeOperation = 'xor';
        var rot = Math.sin(9) * 2 * Math.PI;
        $.beginPath();
        $.fillStyle = 'hsla(' + i + ', 90%, 50%,1)';
        $.arc(50, 50, 2, 0, Math.PI * 2);
        $.fill();
        for (var n = 0; n < 3; ++n) {
            $.scale(1.1, 1.1);
            $.beginPath();
            $.rotate(-90);
            $.fillStyle = 'hsla(' + i * 2 + ', 90%, 50%,1)';
            $.arc(155, 155, 5, 0, Math.PI * 5, false);
            $.fill();
            $.beginPath();
            $.rotate(rot);
            $.fillStyle = 'hsla(' + i * 3 + ', 90%, 50%,1)';
            $.arc(105, 105, 8, 0, Math.PI * 5, false);
            $.fill();
        }
        $.beginPath();
        $.fillStyle = 'hsla(' + i * 1 + ',90%, 40%,1)';
        $.rotate(rot);
        $.arc(10, 10, 20, 0, 2 * Math.PI, false);
        $.fill();
        $.beginPath();
        $.fillStyle = 'hsla(' + i * 4 + ', 980%, 50%,1)';
        $.arc(20, 20, 40, 0, 2 * Math.PI, false);
        $.fill();
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
    }, t, Math.PI * i * 5)); 
 }
 var go = function() {
    $.save();
    $.fillStyle = 'hsla(0,0%,0%,.8)';
    $.fillRect(0, 0, c.width, c.height);
    for (var i in arr) {
        arr[i].draw($);
    }
    $.restore();
 }
 var run = function() {
    window.requestAnimFrame(run);
    go();
    i -= .5;
 }
 window.addEventListener('resize', function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
 }, false);
 run();