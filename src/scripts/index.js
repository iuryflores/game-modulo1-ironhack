document.addEventListener("keydown", (e) => {
  const key = e.code;
  let jump = 50;
  switch (key) {
    case "ArrowLeft": // left arrow
      myGame.player.x -= jump;
      break;
    case "ArrowRight": // right arrow
      myGame.player.x += jump;
      break;
    case "ArrowUp":
      myGame.player.y -= jump;
      break;
    case "ArrowDown":
      myGame.player.y += jump;
      break;
  }
});



window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    myGame.start();
  };
};
