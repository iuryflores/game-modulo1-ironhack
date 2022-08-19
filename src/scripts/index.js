document.addEventListener("keydown", (e) => {
  const key = e.code;
  let jump = 50;
  switch (key) {
    case "ArrowLeft":
      if (myGame.player.x - jump <= 0) {
        myGame.player.x = 0;
      } else {
        myGame.player.x -= jump;
      }
      break;
    case "ArrowRight":
      if (myGame.player.x + myGame.player.width >= myGame.canvas.width) {
        myGame.player.x = myGame.canvas.width - myGame.player.width;
      } else {
        myGame.player.x += jump;
      }

      break;
    case "ArrowUp":
      if (myGame.player.y - jump <= 0) {
        myGame.player.y = 0;
      } else {
        myGame.player.y -= jump;
      }
      break;
    case "ArrowDown":
      if (
        myGame.player.y + myGame.player.height + jump >=
        myGame.canvas.height
      ) {
        myGame.player.y = myGame.canvas.height - myGame.player.height;
      } else {
        myGame.player.y += jump;
      }
      break;
  }
});

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    document.getElementById("game-intro").style.display = "none";
    myGame.start();
  };

  let reloading = sessionStorage.getItem("reloading");
  if (reloading) {
    sessionStorage.removeItem("reloading");

    myGame.start();
  }
};
function myReload() {
  sessionStorage.setItem("reloading", true);

  document.location.reload();
}
document.getElementById("stop-game").style.display = "none";
document.getElementById("help").style.display = "flex";
