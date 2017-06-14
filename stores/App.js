import { observable } from 'mobx';
import Game from './Game';

class AppStore {
  @observable game;

  constructor() {
    this.game = null;
  }

  startGame() {
    this.game = new Game();
  }

  resetGame() {
    this.game.reset();
  }

  endGame() {
    this.game = null;
  }
}

export default new AppStore();
