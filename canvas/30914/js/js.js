var can = document.getElementById('magic')
var ctx = can.getContext("2d"),
    cX = ctx.canvas.width / 2,
    cY = ctx.canvas.height / 2,
    cWidth = can.width,
    cHeight = can.height,
    isExpanding = false,
    lineWidth = 0.6,
    paused = false,
    iteration = 0,
    useRaf = false,
    frameInterval = 30

var maxIterations = 5000

//allow inputs for these value too
color = "#FFFFDF"
a = parseFloat($('#a').val()) || 3
b = parseFloat($('#b').val()) || 10
growLimit = 12
shrinkLimit = 1
growStep = 0.05
angleMod = parseFloat($('#angle').val()) || 3

function draw() {
    // I had this in a setInterval and it animated smoothly on mobile, not sure what the issue is...?
    if (useRaf === true) {
        if (frameInterval)
            setTimeout(function() {
                draw()
            }, frameInterval)
        else
            window.requestAnimationFrame(function() {
                draw()
            })
    } else {
        setTimeout(function() {
            draw()
        }, frameInterval)
    }

    if (paused) {
        return
    }

    //   if (iteration % 2 === 0)
    ctx.clearRect(0, 0, cWidth, cHeight)

    ctx.moveTo(cX, cY)
    ctx.beginPath()
    for (i = 0; i < maxIterations; i++) {
        iteration = i
        angle = angleMod * i
        x = cX + (a + b * angle) * Math.cos(angle)
        y = cY + (a + b * angle) * Math.sin(angle)

        ctx.lineTo(x, y)
    }
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.stroke()

    if (isExpanding) {
        b = b + growStep
        a = a + (growStep + 9.9)
    } else {
        b = b - growStep
        a = a - (growStep + 9.9)
    }

    if (b > growLimit) {
        isExpanding = false
    } else if (b < shrinkLimit) {
        isExpanding = true
    }
}

//start
// setInterval(function(){draw()}, 30)
draw()

$('#angle').on('input', function() {
    angleMod = parseFloat($('#angle').val())
})
$('canvas').on('click', function() {
    paused = !paused
})