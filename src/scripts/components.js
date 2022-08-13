class Component {
  constructor(x, y, width, height, personagemImg) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.personagemImg = personagemImg;
  }

  draw() {
    const ctx = myGame.context;
    ctx.drawImage(personagemImg, this.x, this.y, this.width, this.height);
    //ctx.fillStyle = 'black'
    //ctx.fillRect(this.x,this.y,this.width,this.height)
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
}

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
    //ctx.fillStyle = 'red'
    //ctx.fillRect(this.x,this.y,this.width,this.height)
  }

  updateObstacle() {
    if (myGame.frames % 200 === 0) {
      let posY = Math.floor(Math.random() * myGame.canvas.height);
      myGame.obstacles.push(new Obstacle(myGame.canvas.width, posY, vilanImg));
    }
    for (obstacle of myGame.obstacles) {
      obstacle.x -= myGame.speed;
      obstacle.drawObst();
    }
   
  }
}
let obstacle = new Obstacle();
