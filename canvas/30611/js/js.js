(function() {

    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext('2d');
    var n = 50;
    var g = 5;
    var p = [];
    var grd;
    var l = 0;

    while (p.length < n) {
        p.push({
            x: (canvas.width / 2) + (g * Math.sin(10 / 10000)),
            y: (canvas.height / 2) + (g * Math.sin(10 / 10000)),
            g: g,
            l: 200 - ~~(Math.random() * 200)
        });


        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();


    }


    function update(f) {

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(0, 0, 0, .08)';
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();

        ctx.globalCompositeOperation = 'lighter';


        for (var i in p) {


            ctx.beginPath();
            ctx.moveTo(p[i].x, p[i].y);
            p[i].l += 1;

            if (p[i].l == 200) {
                p[i].g = Math.random() * canvas.width / 2;
                ctx.moveTo(canvas.width / 2, canvas.height / 2);
                p[i].l = 0;
            }





            p[i].x = (canvas.width / 2) + (p[i].g * (Math.sin((f / 1000) - p[i].g)));
            p[i].y = (canvas.height / 2) + (p[i].g * (Math.cos((f / 1000) - p[i].g)));

            ctx.strokeStyle = "#FFF";
            ctx.lineTo(p[i].x, p[i].y);
            ctx.closePath();
            ctx.stroke();



        }

        window.requestAnimationFrame(update);

    }


    window.requestAnimationFrame(update);

})()