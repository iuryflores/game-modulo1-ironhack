//definindo imgs dos envolvidos
const personagemImg = new Image();
personagemImg.src = "./src/imgs/snow.png";

const vilanImg = new Image();
vilanImg.src = "./src/imgs/ww.png";

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
    this.player = new Component(120, 100, 80, 100, personagemImg);

    this.canvas.width = 700;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");

    this.audio.play();

    startGame();
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  updateScore: function () {
    if (this.frames % (3 * this.level) === 0) {
      this.score += 1;
    }
    this.context.font = "20px serif";
    this.context.fillStyle = "red";
    this.context.fillText(`Score: ${this.score}`, 550, 50);
  },
  showLives: function () {
    let posFirst = 100;
    this.context.font = "20px serif";
    this.context.fillText(`Lives: `, 50, 50);
    for (let i = 0; i < this.lives; i++) {
      this.context.font = "30px serif";
      this.context.fillStyle = "blue";
      this.context.fillText(`❤`, posFirst, 50);
      posFirst += 30;
    }
    if (this.lives === 5) {
      this.context.font = "10px serif";
      this.context.fillStyle = "red";
      this.context.fillText(`max`, 250, 50);
    }
  },
};

function startGame() {
  //limpando a tela
  myGame.clear();

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
  if (myGame.frames % 600 === 0) {
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
      
      alert("Morri");
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
