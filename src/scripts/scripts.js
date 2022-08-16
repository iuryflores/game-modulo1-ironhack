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

  updateScore: function () {
    if (this.frames % (10 * this.level) === 0) {
      this.score += 1;
    }
    this.context.font = "20px serif";
    this.context.fillStyle = "red";
    this.context.fillText(`Score: ${this.score}`, 550, 50);
  },
  showLives: function (){
    
    this.context.font = '20px serif';
    this.context.fillStyle = 'blue';
    this.context.fillText(`Lives: ${this.lives}`, 100, 50)
  }
};

function startGame() {
  //limpando a tela
  myGame.clear();

  //desenhando o jogador
  myGame.player.draw();

  //desenhado/atualizando os vilões
  obstacle.updateObstacle();

  //definindo indicadores do inicio do jogo
  myGame.frames += 1;

  //checando se o deu gameOver
  checkGameOver();
  if (!myGame.stop) {
    requestAnimationFrame(startGame);
  }

  //mostrando score
  myGame.updateScore();
  myGame.showLives()

  //fazendo o jogo ficar mais dificil
  if (myGame.frames % 600 === 0) {
    myGame.speed += 0.5;

    console.log("Speed:", myGame.speed);
    console.log("Harder:", myGame.level);
    console.log("Frame:", myGame.frames);
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
  if (crashed) {
    myGame.lives -= 1;
    if (myGame.lives === 0) {
      alert("Morri");
      myGame.stop = true;
    } else {
      myGame.stop = false;
    }
  }
}
