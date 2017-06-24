import { observable } from 'mobx';
import Game from './Game';

class AppStore {
  planeId;
  @observable game;

  constructor() {
    this.game = null;
    this.planeId = generateUniqueId();
  }

  createGame(planeId) {
    this.game = new Game(planeId);
  }

  endGame() {
    this.game = null;
  }
}

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 4);
}

export default new AppStore();
