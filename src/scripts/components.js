class Component {
  constructor(x, y, width, height, personagemImg) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.personagemImg = personagemImg;
    const livesImg = new Image();
    livesImg.src = "src/imgs/live.png";
  }

  draw() {
    const ctx = myGame.context;
    ctx.drawImage(personagemImg, this.x, this.y, this.width, this.height);
  }
  drawLives() {
    const ctx = myGame.context;
    ctx.font = "30px serif";
    ctx.fillStyle = "blue";
    ctx.drawImage(livesImg, this.x, this.y, 30, 20);
    /*ctx.fillText(`❤`, this.x, this.y);*/
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
  crashWithLives(power) {
    return !(
      this.bottom() < power.top() ||
      this.top() > power.bottom() ||
      this.right() < power.left() ||
      this.left() > power.right()
    );
  }
  updateLives() {
    if (myGame.frames % 1200 === 0) {
      let posY = Math.floor(Math.random() * myGame.canvas.height + 100);
      myGame.powers.push(new Component(myGame.canvas.width, posY, 20, 20));
    }
    for (power of myGame.powers) {
      power.x -= myGame.speed;
      power.drawLives();
    }
  }
}
let power = new Component();
class Obstacle {
  constructor(x, y, vilanImg) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 150;
    this.vilanImg = vilanImg;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  drawObst() {
    const ctx = myGame.context;
    ctx.drawImage(vilanImg, this.x, this.y, this.width, this.height);
  }

  updateObstacle() {
    if (myGame.frames < 600) {
      if (myGame.frames % 300 === 0) {
        let posY = Math.floor(Math.random() * myGame.canvas.height - 150);
        if (posY < 0) {
          posY = 0;
        } else if (posY >= myGame.canvas.height) {
          posY = myGame.canvas.height - 150;
        }
        myGame.obstacles.push(
          new Obstacle(myGame.canvas.width + 50, posY, vilanImg)
        );
      }
    }
    if (myGame.frames > 600 && myGame.frames < 2000) {
      if (myGame.frames % 200 === 0) {
        let posY = Math.floor(Math.random() * (myGame.canvas.height - 150));
        if (posY < 0) {
          posY = 0;
        } else if (posY >= myGame.canvas.height) {
          posY = myGame.canvas.height - 150;
        }
        myGame.obstacles.push(
          new Obstacle(myGame.canvas.width + 50, posY, vilanImg)
        );
      }
    }
    if (myGame.frames > 2000) {
      if (myGame.frames % 150 === 0) {
        let posY = Math.floor(Math.random() * (myGame.canvas.height - 150));
        if (posY < 0) {
          posY = 0;
        } else if (posY >= myGame.canvas.height) {
          posY = myGame.canvas.height - 150;
        }
        myGame.obstacles.push(
          new Obstacle(myGame.canvas.width + 50, posY, vilanImg)
        );
      }
    }
    for (obstacle of myGame.obstacles) {
      obstacle.x -= myGame.speed;
      obstacle.drawObst();
      
    }
  }
}
let obstacle = new Obstacle();
