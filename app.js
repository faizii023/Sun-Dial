// const canvas = document.querySelector('#canvas');
var ctx = document.querySelector("canvas").getContext("2d"),
  gr = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height),
  sky = new Image();

sky.onload = go;
sky.src = "http://i.stack.imgur.com/qhQhQ.jpg";
//06:30

var hour = 06,
  min = 30;
var tala = 37 / 60 + 06; // min/60+ht
console.log(tala + "min");
function chng(hr, mns) {
  var tttt = mns / 60 + hr; // min/60+ht
  
  return tttt;
}
function go() {
  // some style setup
  ctx.font = "bold 16px sans-serif";
  gr.addColorStop(0, "#ffc");
  gr.addColorStop(0.75, "gold");
  gr.addColorStop(1, "orange");

  ctx.shadowColor = "#ffa";
  var date = new Date();
  console.log(date.getHours() + "");
  var centerX = ctx.canvas.width * 0.5, // center of arc
    bottomY = ctx.canvas.height + 16, // let center be a bit below horizon
    radiusX = ctx.canvas.width * 0.52, // radius, 80% of width in this example
    radiusY = ctx.canvas.height * 0.8; // radius, 90% of height in this example

  // define sunrise and sunset times (in 24-hour clock, can be fractional)
  var time = 7,
    sunrise = 6.5,
    sunset = 18.35;
  (function loop() {
    var normTime = getTime();
    // console.log(normTime);
    // get normalized time
    var angle = getAngle(normTime); // get angle in radians
    var x = centerX + radiusX * Math.cos(angle); // calcuate point
    var y = bottomY + radiusY * Math.sin(angle);
    drawSky(normTime); // draw sky gradient
    drawSun(x, y); // draw sun at point
    // drawTime(); // render time
    requestAnimationFrame(loop); // loop
  })();

  function getTime() {
    // produces a normalized pseduo-time
    time += 0.033;
    var hr = date.getHours();
    var mns = date.getMinutes();
    var aa=chng(hr,mns);
    console.log(aa);
    if (time > 23) time = 0;
    return (aa - sunrise) / (sunset - sunrise);
  }

  function getAngle(normTime) {
    return Math.PI + Math.PI * normTime;
  }

  function drawSun(x, y) {
    ctx.beginPath();
    ctx.moveTo(x + 16, y);
    ctx.arc(x, y, 16, 0, 6.28);
    ctx.fillStyle = gr;
    ctx.shadowBlur = 20;
    ctx.fill();
  }

  function drawTime() {
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 0;
    ctx.fillText("Time: " + time.toFixed(1) + "h", 10, 20);
  }

  function drawSky(t) {
    t = Math.max(0, Math.min(1, t));
    var iw = sky.width,
      w = ctx.canvas.width,
      x = 60 + (iw - 120) * t;
    ctx.drawImage(sky, x, 0, 1, sky.height, 0, 0, w, ctx.canvas.height);
  }
}
// if (canvas.getContext) {

//     const ctx = canvas.getContext('2d');

//     ctx.strokeStyle = 'green';
//     ctx.lineWidth = 2;

//     const x = 40,
//         y = canvas.height / 2,
//         space = 10,
//         radius = 30,
//         arcCount = 6;

//     for (let i = 0; i < arcCount; i++) {
//         ctx.beginPath();
//         ctx.arc(x + i * (radius * 2 + space), y, radius, 0, (i + 1) * (2 * Math.PI) / arcCount, false);
//         ctx.stroke();
//     }
// }
