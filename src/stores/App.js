import { observable, action } from 'mobx';
import Game from './Game';
import Settings from './Settings';


class AppStore {
  @observable settings;
  @observable game;

  constructor() {
    this.createSettings();
  }

  createSettings() {
    this.settings = new Settings();
  }

  @action createGame(planeId) {
    this.game = new Game(planeId);
  }

  @action endGame() {
    this.game = null;
  }
}

export default new AppStore();
