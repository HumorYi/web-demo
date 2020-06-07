var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    cen = {
        x: w / 2,
        y: h / 2
    },
    radiant = 0,
    particles = [],
    particleCount = 1,
    frame = 0,
    middleCover = ctx.createRadialGradient(cen.x, cen.y, 0, cen.x, cen.y, 20);

middleCover.addColorStop(0, 'rgba(0, 0, 0, .1)');
middleCover.addColorStop(1, 'rgba(0, 0, 0, 0)');

function anim() {
    window.requestAnimationFrame(anim);

    update();
}
anim();

function Particle() {
    this.x = cen.x;
    this.y = cen.y;

    this.vx = Math.cos(radiant);
    this.vy = Math.sin(radiant);

    this.ax = this.vx / 50;
    this.ay = this.vy / 50;

    this.color = 'hsl(rad, 80%, 50%)'
        .replace('rad', ((radiant / Math.PI) * 180) | 0);
}
Particle.prototype.update = function() {
    this.x += this.vx += this.ax;
    this.y += this.vy += this.ay;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 2, 2);
}

function update() {

    ctx.fillStyle = 'rgba(0, 0, 0, .04)';
    ctx.fillRect(0, 0, w, h);

    radiant += .5;
    radiant %= Math.PI * 2;

    ++frame;
    if (frame > particleCount) {
        frame = 0;
        particles.push(new Particle);
    }

    for (var i = 0; i < particles.length; ++i) {
        var par = particles[i];
        par.update();

        if (par.x > w || par.x < 0 || par.y > h || par.y < 0) {
            particles.splice(i, 1);
            --i;
        }
    }

    ctx.fillStyle = middleCover;
    ctx.beginPath();
    ctx.arc(cen.x, cen.y, 20, 0, Math.PI * 2);
    ctx.fill();
}

document.addEventListener('click', function() {
    for (var i = 0; i < 10; ++i) update();
})


for (var i = 0; i < 100; ++i) update();