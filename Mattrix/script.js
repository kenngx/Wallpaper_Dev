var root = {
  wavecolor: {  
    r: 125,
    g: 52,
    b: 253
    },
    rainbowSpeed: 0.5,
    rainbow: true,
    matrixspeed: 50
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");

var hueFw = false;
var hue = -0.01;

// Tạo canvas full màn hình
c.height = window.innerHeight;
c.width = window.innerWidth;

// Ký tự xuất hiện
var konkani  = "゠A B C D E F G H I K L M N O P Q R S T U V W X Y Z a b c d e f g h i k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 0 - = { } [ ] ; ' , . / \\ ~ ` ! @ # $ % ^ & * ( ) _ + | : \" < > ? '";
// converte chuỗi string sang mảng array của ký tử đơn
var characters = konkani.split("");
var font_size = 14;
var columns = c.width/font_size;    // số cột của ký tự
var gradient = ctx.createLinearGradient(0,10, 0,200);
// array of drops
var drops = [];

for (var x = 0; x < columns; x++)
    drops[x] = 1;

// vẽ ký tự
function draw() {
    // lấy BG color

    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#BBB"; // grey text
    ctx.font = font_size + "px arial";

    // looping over drops
    for (var i = 0; i < drops.length; i++)
    {
        // background color
        ctx.fillStyle = "rgba(10,10,10, 1)";
        ctx.fillRect(i * font_size, drops[i] * font_size,font_size,font_size);
        // a random chinese character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size

        if (root.rainbow) {
          hue += (hueFw) ? 0.01 : -0.01;
          var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
          var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
          var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
          ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
        } else {
          ctx.fillStyle = 'rgba(' + root.wavecolor.r + ',' + root.wavecolor.g + ',' + root.wavecolor.b + ')';
        }

        ctx.fillText(text, i * font_size, drops[i] * font_size);

        drops[i]++;
   
       if (drops[i] * font_size > c.height && Math.random() > 0.975)
			      drops[i] = 0;
    }
}

window.onresize=()=>{
    location.reload();
}

setInterval(draw, root.matrixspeed);

function livelyPropertyListener(name, val)
{
  switch(name) {
    case "matrixColor":
      root.wavecolor =  hexToRgb(val);
      break;
    case "rainBow":
      root.rainbow = val;
      break;   
    case "rainbowSpeed":
      root.rainbowSpeed = val/100;
      break;     
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

