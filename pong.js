const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const paddle_width = 5;
const paddle_height = 40;
const paddle_speed = 1;
const ball_speed = 1;

let p1_top = 0;
let p2_top = 0;
let ball = 0;

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

}

function adjust_p2() {

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
}

main();
