import { observable } from 'mobx';
import Game from './Game';

class AppStore {
  @observable game;

  constructor() {
    this.game = null;
  }

  createGame() {
    this.game = new Game();
  }

  endGame() {
    this.game = null;
  }
}

export default new AppStore();
