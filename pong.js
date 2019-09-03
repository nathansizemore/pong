// The MIT License

// Copyright (c) 2019 Nathan Sizemore

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let paddle_width = canvas.width * 0.01;
let paddle_height = canvas.height * 0.20;
const paddle_speed = 5;

let ball_width = canvas.width * 0.007;
let ball_height = ball_width;
const ball_speed = 10;
const ball = {
  position: {
    x: (canvas.width / 2) - (ball_width / 2),
    y: (canvas.height / 2) - (ball_height / 2)
  },
  velocity: {
    x: random_int(2) == 0 ? -1 : 1,
    y: random_int(2) == 0 ? -1 : 1
  }
};

window.onresize = function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  paddle_width = canvas.width * 0.01;
  paddle_height = canvas.height * 0.20;

  ball_width = canvas.width * 0.007;
  ball_height = ball_width;
};

let p1_top = 0;
let p2_top = 0;

let p1_score = 0;
let p2_score = 0;
let game_over = false;
const winning_number = 10;

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

function pong() {
  check_for_game_over();
  adjust_for_input();
  move_ball();
  adjust_for_collision();
  clear_screen();
  draw();

  if (!game_over)
    window.requestAnimationFrame(pong);
  else
    show_game_over();
}

function check_for_game_over() {
  game_over = p1_score === winning_number || p2_score === winning_number;
}

function show_game_over() {
  let player = 1;
  if (p2_score === winning_number)
    player = 2;

  clear_screen();

  ctx.font = "50px bold monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(`Player ${player} Wins!`, canvas.width / 2, canvas.height / 2);
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
  let x = ball.position.x + (ball.velocity.x * ball_speed);
  let y = ball.position.y + (ball.velocity.y * ball_speed);

  if (x < 0)
    x = 0;
  else if ((x + ball_width) > canvas.width)
    x = canvas.width - ball_width;

  if (y < 0)
    y = 0;
  else if ((y + ball_height) > canvas.height)
    y = canvas.height - ball_height;

  ball.position.x = x;
  ball.position.y = y;
}

function clear_screen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  draw_p1();
  draw_p2();
  draw_ball();
  draw_scores();
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
  ctx.fillRect(ball.position.x, ball.position.y, ball_width, ball_height);
}

function draw_scores() {
  ctx.font = "50px bold monospace";
  ctx.fillText(`${p1_score}`, canvas.width / 4, 50);
  ctx.fillText(`${p2_score}`, (canvas.width / 4) * 3, 50);
}

function adjust_for_collision() {
  const x = ball.position.x;
  const y = ball.position.y;

  if (hit_top_wall(y) || hit_bottom_wall(y))
    ball.velocity.y *= -1;

  if (hit_left_wall(x)) {
    p2_score += 1;
    reset_ball();
  } else if (hit_right_wall(x)) {
    p1_score += 1;
    reset_ball();
  } else if (hit_p1_paddle(x, y)) {
    ball.position.x = paddle_width;
    ball.velocity.x *= -1;
  } else if (hit_p2_paddle(x, y)) {
    ball.position.x = canvas.width - paddle_width - ball_width;
    ball.velocity.x *= -1;
  }
}

function hit_top_wall(y) {
  return y === 0;
}

function hit_bottom_wall(y) {
  return (y + ball_height) === canvas.height;
}

function hit_left_wall(x) {
  return x === 0;
}

function hit_right_wall(x) {
  return (x + ball_width) === canvas.width;
}

function hit_p1_paddle(x, y) {
  const within_width = x <= paddle_width;
  const within_height = y >= p1_top && y <= (p1_top + paddle_height);

  return within_width && within_height;
}

function hit_p2_paddle(x, y) {
  const within_width = (x + ball_width) >= (canvas.width - paddle_width);
  const within_height = y >= p2_top && y <= (p2_top + paddle_height);

  return within_width && within_height;
}

function reset_ball() {
  ball.position.x = (canvas.width / 2) - (ball_width / 2);
  ball.position.y = canvas.height / 2 - (ball_height / 2);
  ball.velocity.x = random_int(2) == 0 ? -1 : 1;
  ball.velocity.y = random_int(2) == 0 ? -1 : 1;
}

function random_int(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

pong();
