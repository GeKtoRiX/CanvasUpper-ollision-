var htmlCanvas001 = document.getElementById("canvas001");
var canvas001 = htmlCanvas001.getContext(`2d`);
htmlCanvas001.style.backgroundColor = `black`;
htmlCanvas001.width = window.innerWidth - 4;
htmlCanvas001.height = window.innerHeight - 4;

// Уравнивание размера холста в соответсвии с размерами окна браузера.
window.addEventListener(`resize`, function () {
  htmlCanvas001.width = window.innerWidth;
  htmlCanvas001.height = window.innerHeight;
  getBalls();
});
window.addEventListener("click", function () {
  getBalls();
  if (ballsNum <= 150) ballsNum = ballsNum + ballsNum / 4;
});

window.addEventListener('dblclick',function name() {
  window.location.reload();
})

// Переменные.
var mouse = {
  x: htmlCanvas001.width / 2,
  y: htmlCanvas001.height / 2,
};
var ballsNum = 25;
var gravity = 1;
var friction = 0.8;
addEventListener(`mousemove`, function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

function randomIntFromRage(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function () {
    canvas001.beginPath();
    canvas001.fillStyle = "hsl(" + color + ", 50%, 50%)";
    canvas001.strokeStyle = "white";
    canvas001.lineWidth = 2;
    canvas001.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    canvas001.fill();
    canvas001.stroke();
    canvas001.closePath();
  };

  this.update = function () {
    if (this.y + this.radius + this.dy > htmlCanvas001.height) {
      // Каждый отскок окружности уменьшает ее кинетическую энергию на 10%.
      this.dy = -this.dy * friction;
    } else {
      // Ускорение падения и отскока окружности.
      this.dy += gravity;
    }
    if (
      this.x + this.radius + this.dx > htmlCanvas001.width ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx * friction;
    }
    // Изменение положения окружности.
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

var ballsArray = [];
function animate() {
  canvas001.clearRect(0, 0, htmlCanvas001.width, htmlCanvas001.height);
  for (let i = 0; i < ballsArray.length; i++) {
    ballsArray[i].update();
  }
  requestAnimationFrame(animate);
}

function getBalls() {
  ballsArray = [];
  for (let i = 0; i < ballsNum; i++) {
    var radius = randomIntFromRage(10, 45);
    var x = randomIntFromRage(radius, htmlCanvas001.width - radius);
    var dx = randomIntFromRage(-2, 2);
    var y = randomIntFromRage(
      htmlCanvas001.height / 10,
      htmlCanvas001.height - radius
    );
    var dy = randomIntFromRage(0.1, 0.5);
    var color = randomIntFromRage(0, 365);
    ballsArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}
// Элемент по умолчанию.
getBalls();
animate();
