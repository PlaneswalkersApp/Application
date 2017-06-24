import { observable, action } from 'mobx';

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

  @action setLife(life) {
    this.life = life;
  }

  @action incrementLife(lifeGain) {
    this.life += lifeGain;
  }

  @action decrementLife(lifeLoss) {
    this.life -= lifeLoss;
  }
}

export default Player;
