//definindo imgs dos envolvidos
const personagemImg = new Image();
personagemImg.src = "../imgs/snow.png";

const vilanImg = new Image();
vilanImg.src = "../imgs/ww.png";

const myGame = {
  canvas: document.querySelector("canvas"),
  frames: 0,
  obstacles: [],
  stop: false,
  player: null,
  start: function () {
    this.player = new Component(120, 100, 80, 110, personagemImg);

    this.canvas.width = 700;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");

    startGame();
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};




function startGame() {
  myGame.clear();
  myGame.player.draw();
  obstacle.updateObstacle();

  myGame.frames += 2;
  checkGameOver();
  if (!myGame.stop) {
    requestAnimationFrame(startGame);
  }


  console.log(myGame.player.x)
}

function checkGameOver() {
  const crashed = myGame.obstacles.some((obstacle) =>
    myGame.player.crashWith(obstacle)
  );
  if (crashed) {
    alert("bati");
    myGame.stop = true;
  }
}
