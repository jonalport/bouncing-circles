// Extend Array to provide random element
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () { 
  canvasApp();
}

function canvasSupport () { 
  return Modernizr.canvas;
}

function canvasApp() {

  if (!canvasSupport()) { 
    return;
  }

  window.addEventListener('resize', setCanvasSize, false);

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var BACKGROUND = 'FFF';
  var circles = [];
  var colours = ['1FA2F4', '0569CE', 'F48C36', 'DE662C'];
  setCanvasSize();
  var NUM_CIRCLES = Math.round(canvas.height * canvas.width / 20000);
  console.log(NUM_CIRCLES);
  createCircles();
  loop();

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createCircles() {
    circles = [];
    var x, y;
    
    for (var i = 0; i < NUM_CIRCLES; i++) {
      var circle = {
        size: Math.round(Math.random() * 75 + 5),
        x: Math.round(canvas.width / 2),
        y: Math.round(canvas.height / 2),
        velocity_x: Math.random() * 4 - 2,
        velocity_y: Math.random() * 4 - 2,
        colour: '#' + colours.randomElement(),
        move: function() {
          x = this.x + this.velocity_x;
          y = this.y + this.velocity_y;
          // Bounce?
          if(x < this.size || x > (canvas.width - this.size)) {
            this.velocity_x *= -1;
            x = this.x + this.velocity_x;
          }
          if(y < this.size || y > (canvas.height - this.size)) {
            this.velocity_y *= -1;
            y = this.y + this.velocity_y;
          }

          this.x = x;
          this.y = y;
          this.draw();
        },
        draw: function() {
          context.globalAlpha = 0.3;
          context.fillStyle = this.colour;
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
          context.closePath();
          context.fill();
        }
      };
      
      circles.push( circle );
    }
  }
  
  function drawScreen() { 
    context.globalAlpha = 1;
    context.fillStyle = '#' + BACKGROUND;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);    

    for(i = 0, len = circles.length; i < len; i++) {
      circles[i].move();
    }
  }

  function loop() {   
    window.setTimeout(loop, 1000 / 60);
    drawScreen();
    drawScreen();
  }
}
