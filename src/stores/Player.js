import { observable, action } from 'mobx';

const AVAILABLE_COLORS = [
  '#40BCD8',
  '#35F4A2',
  '#FFD700',
  '#E75A7C',
  '#89BD9E',
  '#FCA17D',
  '#7DE2D1'
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
    return AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)];
  }

  @action setLife(life) {
    this.life = life;
  }

  @action changeLife(life) {
    this.life += life;
  }
}

export default Player;
