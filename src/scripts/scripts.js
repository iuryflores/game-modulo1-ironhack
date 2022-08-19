//definindo imgs dos envolvidos
const personagemImg = new Image();
personagemImg.src = "./src/imgs/snow.png";

const vilanImg = new Image();
vilanImg.src = "./src/imgs/ww.png";

const livesImg = new Image();
livesImg.src = "/src/imgs/live.png";

const myGame = {
  canvas: document.querySelector("canvas"),
  frames: 0,
  obstacles: [],
  stop: false,
  player: null,
  level: 1,
  speed: 1,
  score: 0,
  lives: 5,
  powers: [],
  audio: new Audio("theme80.mp3"),

  start: function () {
    this.player = new Component(120, 100, 100, 120, personagemImg);

    this.canvas.width = 800;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    this.audio.play();
    this.audio.loop = true;

    startGame();
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  updateScore: function () {
    if (this.frames % (3 * this.level) === 0) {
      this.score += 1;
    }

    this.context.font = "20px GameFont";
    this.context.fillStyle = "black";
    this.context.fillText(`Score: ${this.score}`, 650, 50);
  },
  showLives: function () {
    let posFirst = 100;
    this.context.font = "20px GameFont";
    this.context.fillText(`Lives: `, 20, 50);
    for (let i = 0; i < this.lives; i++) {
      this.context.font = "30px serif";
      this.context.fillStyle = "black";
      this.context.drawImage(livesImg, posFirst, 20, 40, 30);
      /*this.context.fillText(`❤`, posFirst, 50);*/
      posFirst += 40;
    }
    if (this.lives === 5) {
      this.context.font = "10px serif";
      this.context.fillStyle = "black";
      this.context.fillText(`max`, 300, 40);
    }
  },
};

function startGame() {
  //limpando a tela
  myGame.clear();
  document.getElementById("game-intro").style.display = "none";
  //desenhando o jogador
  myGame.player.draw();



  //desenhado/atualizando os vilões
  obstacle.updateObstacle();
  power.updateLives();

  //definindo indicadores do inicio do jogo
  myGame.frames += 1;

  //checando se o deu gameOver
  checkGameOver();
  if (!myGame.stop) {
    requestAnimationFrame(startGame);
  }

  //mostrando score
  myGame.updateScore();
  myGame.showLives();

  //fazendo o jogo ficar mais dificil
  if (myGame.frames % 450 === 0) {
    myGame.speed += 0.5;
  }
}

function checkGameOver() {
  const crashed = myGame.obstacles.some((obstacle, index) => {
    let check = myGame.player.crashWith(obstacle);
    if (check) {
      myGame.obstacles.splice(index, 1);
    }
    return check;
  });
  const fillPower = myGame.powers.some((power, index) => {
    let getPower = myGame.player.crashWithLives(power);
    if (getPower) {
      myGame.powers.splice(index, 1);
    }
    return getPower;
  });
  if (crashed) {
    myGame.lives -= 1;
    if (myGame.lives === 0) {
      myGame.stop = true;
      myGame.audio.pause();
      document.getElementById("stop-game").style.display = "flex";
    } else {
      myGame.stop = false;
    }
  }
  if (fillPower) {
    if (myGame.lives < 5) {
      myGame.lives += 1;
    }
  }
}
