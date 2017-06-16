import { observable } from 'mobx';

class Player {
  color;
  @observable life;

  constructor(life) {
    this.life = life;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    return 'black';
  }

  @observable increaseLife(lifeGain) {
    life += lifeGain;
  }

  @observable decreaseLife(lifeLoss) {
    life += lifeLoss;
  }
}

export default Player;
