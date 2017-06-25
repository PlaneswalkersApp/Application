import { observable, action } from 'mobx';

const AVAILABLE_COLORS = [
  '#31C7F9',
  '#E71D36',
  '#35F4A2',
  '#FFE760'
];

class Player {
  id;
  nickname;
  leader;
  color;
  @observable life;

  constructor(id, nickname, leader) {
    this.id = id;
    this.nickname = nickname;
    this.leader = leader;
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
