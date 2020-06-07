var w = c.width = 400,
    h = c.height = 400,
    ctx = c.getContext('2d'),
    cogs = 6,
    teeth = 10,
    cogRadius = 120,
    toothRadius = 50,
    frame = 0,
    speed = .01,

    Tau = Math.PI * 2,
    cogSpacingRadiant = Tau / cogs,
    teethSpacingRadiant = Tau / teeth;

ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
ctx.translate(w / 2, h / 2);

function anim() {
    window.requestAnimationFrame(anim);

    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.fillStyle = 'rgba(20, 200, 150, .4)';

    frame += speed;
    frame %= Tau;

    for (var cog = 0; cog < cogs; ++cog) {

        var direction = cog % 2 === 0 ? 1 : -1,
            cogX = Math.cos(cogSpacingRadiant * cog + frame) * cogRadius,
            cogY = Math.sin(cogSpacingRadiant * cog + frame) * cogRadius;

        for (var tooth = 0; tooth < teeth; ++tooth) {

            var difference = frame * direction * 2,
                toothX = cogX + Math.cos(teethSpacingRadiant * tooth + difference) * toothRadius,
                toothY = cogY + Math.sin(teethSpacingRadiant * tooth + difference) * toothRadius;

            ctx.beginPath();
            ctx.moveTo(cogX, cogY);
            ctx.lineTo(toothX, toothY);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(toothX, toothY, 3, 0, Tau);
            ctx.fill();
            ctx.closePath();
        }
    }
}

anim();