var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
    hue = 217,
    stars = [],
    count = 0,
    maxStars = 50;//星星数量

    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,w,h);
    ctx.fill();

var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
canvas2.width = 50;
canvas2.height = 50;
var half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);//渐变开始圆的x  y坐标，开始圆的半径；渐变结束圆的x y 坐标，结束圆的半径
gradient2.addColorStop(0.025, '#CCC');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();
// End cache
function random(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }
    if (min > max) {
        var hold = max;
        max = min;
        min = hold;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function maxOrbit(x, y) {
    var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
    //星星移动范围，值越大范围越小，
}
var Star = function() {
    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 8;
    //星星大小
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 50000;
    //星星移动速度
    this.alpha = random(2, 10) / 10;
    count++;
    stars[count] = this;
}
Star.prototype.draw = function() {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);
    if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
    }
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
}
for (var i = 0; i < maxStars; i++) {
    new Star();
}
function animation() {
    ctx.globalCompositeOperation = 'source-over';//将新画的‘源’图像覆盖在已有的图像上   “destination-over”  已有图像覆盖新图像；
    ctx.globalAlpha = 0.9; //尾巴  透明度设置
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'; //色调（0~360）；饱和度（0.0%~100.0~）；亮度（0.0~100%）；透明度（0~1）；
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
    };
    window.requestAnimationFrame(animation);
}
animation();
