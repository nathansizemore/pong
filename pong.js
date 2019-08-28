const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const paddle_width = 5;
const paddle_height = 40;
const paddle_speed = 1;
const ball_width = 3;
const ball_height = 3;
const ball_speed = 1;
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2
};
const ball_velocity = {
  x: (getRandomInt(2) == 0 ? -1 : 1) * ball_speed,
  y: (getRandomInt(2) == 0 ? -1 : 1) * ball_speed
};

let p1_top = 0;
let p2_top = 0;

let w_down = false;
let s_down = false;
let o_down = false;
let l_down = false;
window.onkeydown = function (e) {
  if (e.code === "KeyW")
    w_down = true;
  else if (e.code === "KeyS")
    s_down = true;
  else if (e.code === "KeyO")
    o_down = true;
  else if (e.code === "KeyL")
    l_down = true;
};
window.onkeyup = function (e) {
  if (e.code === "KeyW")
    w_down = false;
  else if (e.code === "KeyS")
    s_down = false;
  else if (e.code === "KeyO")
    o_down = false;
  else if (e.code === "KeyL")
    l_down = false;
};

function main() {
  window.requestAnimationFrame(main);

  adjust_for_input();
  move_ball();
  clear_screen();
  draw();
}

function adjust_for_input() {
  adjust_p1();
  adjust_p2();
}

function adjust_p1() {
  if (w_down && s_down)
    return;

  let direction = 0;
  if (w_down)
    direction = -1;
  else if (s_down)
    direction = 1;

  p1_top += direction * paddle_speed;

  if (p1_top < 0)
    p1_top = 0;
  else if (p1_top + paddle_height > canvas.height)
    p1_top = canvas.height - paddle_height;
}

function adjust_p2() {
  if (o_down && l_down)
    return;

  let direction = 0;
  if (o_down)
    direction = -1;
  else if (l_down)
    direction = 1;

  p2_top += direction * paddle_speed;

  if (p2_top < 0)
    p2_top = 0;
  else if (p2_top + paddle_height > canvas.height)
    p2_top = canvas.height - paddle_height;
}

function move_ball() {

}

function clear_screen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  draw_p1();
  draw_p2();
  draw_ball();
}

function draw_p1() {
  const x = 0;
  const y = p1_top;

  ctx.fillStyle = "white";
  ctx.fillRect(x, y, paddle_width, paddle_height);
}

function draw_p2() {
  const x = canvas.width - paddle_width;
  const y = p2_top;

  ctx.fillStyle = "white";
  ctx.fillRect(x, y, paddle_width, paddle_height);
}

function draw_ball() {
  ctx.fillStyle = "white";
  ctx.fillRect(ball.x, ball.y, ball_width, ball_height);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

main();
