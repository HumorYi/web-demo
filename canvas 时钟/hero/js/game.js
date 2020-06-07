var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png"

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

var hero = {
    speed: 256
};

var monster = {};
var monstersCaught = 0;
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function (modifier) {
    if (38 in keysDown || 87 in keysDown) {
        hero.y -= hero.speed * modifier;
        if (hero.y < 32) {
            hero.y = 32;
        }
    }
    if (40 in keysDown || 83 in keysDown) {
        hero.y += hero.speed * modifier;
        if (hero.y > canvas.height - 64) {
            hero.y = canvas.height - 64;
        }
    }
    if (37 in keysDown || 65 in keysDown) {
        hero.x -= hero.speed * modifier;
        if (hero.x < 32) {
            hero.x = 32;
        }
    }
    if (39 in keysDown || 68 in keysDown) {
        hero.x += hero.speed * modifier;
        if (hero.x > canvas.width - 64) {
            hero.x = canvas.width - 64;
        }
    }

    if (
        hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    }
};

var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("得分 : " + monstersCaught, 32, 32);
};

var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
reset();
main();

function getKeyAndMove(event) {
    var keyCode;  //记录按下的键盘按键的键码
    if (event == null)//根据不同的浏览器，用不同的方式获得keyCode
    {
        keyCode = window.event.keyCode;
        window.event.preventDefault();
    }
    else {
        keyCode = event.keyCode;
        event.preventDefault();
    }
    //根据不同的keyCode作出响应
    switch (keyCode) {
        case 0x25: //方向左键
        case 65:   //A 向左
        {
            t.tetrisLeft();
            break;
        }
        case 0x27: //方向右键
        case 68:   //D 向右
        {
            t.tetrisRight();
            break;
        }
        case 0x28: //方向右键
        case 83:   //S  向下
        {
            t.tetrisDown();
            break;
        }
        case 0x26: //方向上键
        case 87:   //W  旋转
        {
            t.tetrisRotate();
            break;
        }
        default: {//如果按键不是方向键，取消键盘事件侦听
            window.removeEventListener('keydown', getkeyAndMove, false);
        }
    }
}
function updateSpeed() {
    var speed = document.getElementById("speed").value;
    hero.speed = speed;
}
