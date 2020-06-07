window.requestAnimFrame = (function(){
return window.requestAnimationFrame     ||
          window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) { window.setTimeout(callback, 1000 / 60); };
})();
var $,
    c,
    off_r,
    arr;

c = document.getElementsByTagName('canvas')[0],
$ = c.getContext('2d');
c.width = c.height = 1040;
$.fillRect(0,0,1040,1040);

off_r = 200;

arr = [11,17,29];

setInterval(art,30);

function rnd(){
  for(var a = 0; a < 7; a++){
    arr[a] = (a + 1)*11 + Math.floor(Math.random()*11);
  }
}
function art(){
    var a,b,c,x,y,x2,y2,x3,y3,rad,rad2,rad3,lay;
    $.fillStyle="hsla(0,0%,0%,1)";
    $.fillRect(0,0,1040,1040);
    $.fillStyle="hsla("+ (off_r*97) +",80%,90%,1)";
    off_r += 1/33;
    draw(560, 280, 140, arr[2]);
    rad = -off_r;
    lay = Math.PI*2/7;
    
    for(a = 0; a < 7; a++){
        x = 560 + Math.cos(rad)*130;
        y = 280 + Math.sin(rad)*130;
        draw(x, y, 40, arr[1]);
        rad += lay;
        
        rad2 = off_r/2;
      
        for(b = 0; b < 7; b++){
            x2 = x + Math.cos(rad2)*100;
            y2 = y + Math.sin(rad2)*100;
            draw(x2, y2, 20, arr[0]);
            rad2 += lay;
            
            rad3 = -off_r;
            for(c = 0; c < 7; c++){
                x3 = x2 + Math.cos(rad3)*70;
                y3 = y2 + Math.sin(rad3)*70;
                $.beginPath();
                $.arc(x3, y3, 2, 0, Math.PI*2, false);
                $.fill();
                rad3 += lay;
            }
        }  
    }
}

function draw(x,y, radi, n, bai){
    var a, b, c, rad;
  
    for(a = 1; a < n/2; a++){
        if(conn(a, n) > 1){
          continue;
        }
        $.strokeStyle="hsla("+((a + off_r/2)*97)+",80%,60%,1)";
        $.beginPath();
        $.moveTo(x + Math.cos(off_r)*radi,y +  Math.sin(off_r)*radi);
        
        for(b = 0; b < n; b++){
            rad = Math.PI*2*(b/n*a) + off_r;
            $.lineTo(x + Math.cos(rad)*radi, y + Math.sin(rad)*radi);
        }
        
        $.closePath();
        $.stroke();
    }
}

function conn(a,b){
var c ;
while(b){
c = a%b ;
a = b ;
b = c ;
}
return a ;
}
window.onload = function(){
  document.onclick= rnd;
}