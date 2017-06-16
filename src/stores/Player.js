import { observable } from 'mobx';

const AVAILABLE_COLORS = [
  '#31C7F9',
  '#E71D36',
  '#35F4A2',
  '#FFE760'
];

class Player {
  id;
  color;
  pickedColors;
  @observable life;

  constructor(id, life) {
    this.id = id;
    this.life = life;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    return AVAILABLE_COLORS[this.id];
  }

  setLife(life) {
    this.life = life;
  }

  @observable increaseLife(lifeGain) {
    life += lifeGain;
  }

  @observable decreaseLife(lifeLoss) {
    life += lifeLoss;
  }
}

export default Player;
