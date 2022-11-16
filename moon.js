// const canvas = document.querySelector('#canvas');
var ctx = document.querySelector("canvas").getContext("2d"),
  gr = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height),
  sky = new Image();
var ctxMoon = document.querySelector("canvas").getContext("2d"),
  moonGr = ctxMoon.createLinearGradient(0, 0, 0, ctxMoon.canvas.height);
sky.onload = go;
sky.src = "http://i.stack.imgur.com/qhQhQ.jpg";
//06:30

var hour = 06,
  min = 30;
var tala = 37 / 60 + 06; // min/60+ht
console.log(tala + "min");
var test = (90 + 180) % 360;
console.log(test + "Angle");
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
  moonGr.addColorStop(0, "#cd4e");
  moonGr.addColorStop(0.75, "#aaa");
  moonGr.addColorStop(0, "#000");
  var angle = 90;
  var oppositeAngle = (angle + 180) % 360;
  console.log(oppositeAngle + "IN");
  ctx.shadowColor = "#ffa";
  ctxMoon.shadowColor = "#ffa";
  var date = new Date();
  console.log(date.getHours() + "");
  //h=400 w=500
  var centerX = 500 * 0.5, // center of arc
    bottomY = 400 + 16, // let center be a bit below horizon
    radiusX = 500 * 0.5, // radius, 80% of width in this example
    radiusY = 400 * 0.9; // radius, 90% of height in this example

  // define sunrise and sunset times (in 24-hour clock, can be fractional)
  var time = 7,
    sunrise = 6.5,
    sunset = 18.35;
  var nTime = 3.5;
  (function loop() {
    var normTime = getTime();
    // console.log(normTime);
    // get normalized time
    var angle = getAngle(normTime); // get angle in radians
    var x = centerX + radiusX * Math.cos(angle); // calcuate point
    var y = bottomY + radiusY * Math.sin(angle);
    var hr = date.getHours();
    var mns = date.getMinutes();
    var aa = chng(hr, mns);
    // console.log(time + "SUNSET");
    var nightTime = getNightTime();
    var nightAngle = getAngle(nightTime);
    var oppAngleX = (nightAngle + 180) % 360;
    var oppAngleY = (nightAngle + 180) % 360;
    var oppx = centerX + radiusX * Math.cos(oppAngleX); // calcuate point
    var oppy = bottomY + radiusY * Math.sin(oppAngleY);
    // drawSky(normTime); // draw sky gradient

    drawMoon(oppx, oppy);

    drawSun(x, y); // draw sun at point
    drawTime(); // render time
    requestAnimationFrame(loop); // loop
  })();

  function getTime() {
    // produces a normalized pseduo-time
    time += 0.033;
    var hr = date.getHours();
    var mns = date.getMinutes();
    var aa = chng(hr, mns);

    if (time >= 24) time = 0;
    return (time - sunrise) / (sunset - sunrise);
  }
  function getNightTime() {
    nTime += 0.033;
    var hr = date.getHours();
    var mns = date.getMinutes();
    var aa = chng(hr, mns);

    if (nTime >= 24) nTime = 0;
    return (nTime - sunrise) / (sunset - sunrise);
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
  function drawMoon(x, y) {
    ctxMoon.beginPath();
    ctxMoon.moveTo(x + 16, y);
    ctxMoon.arc(x, y, 16, 0, 6.28);
    ctxMoon.fillStyle = moonGr;
    ctxMoon.shadowBlur = 20;
    ctxMoon.fill();
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
