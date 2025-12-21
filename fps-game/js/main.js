import { updateFOV, fov } from "./camera.js";
import { money } from "./shop.js";

function draw() {
  updateFOV();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 스코프 느낌 (줌)
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.scale(90 / fov, 90 / fov);
  ctx.translate(-canvas.width/2, -canvas.height/2);

  // 크로스헤어
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(canvas.width/2 - 10, canvas.height/2);
  ctx.lineTo(canvas.width/2 + 10, canvas.height/2);
  ctx.stroke();

  // 더미
  ctx.fillStyle = "gray";
  ctx.fillRect(
    canvas.width/2 - 25 + dummy.xOffset,
    canvas.height/2 - 150,
    50,
    80
  );

  // 데미지 숫자
  if (dummy.damageTimer > 0) {
    ctx.fillStyle = "red";
    ctx.fillText(
      dummy.damageText,
      canvas.width/2,
      canvas.height/2 - 170 - (30 - dummy.damageTimer)
    );
  }

  ctx.restore();

  // HUD
  ctx.fillStyle = "white";
  ctx.fillText("Money: $" + money, 20, 20);
  ctx.fillText("Dummy HP: " + dummy.hp, 20, 40);
}