import { observable, action } from 'mobx';

class Player {
  @observable name;
  @observable lifeTotal;

  constructor(name, lifeTotal) {
    this.name = name;
    this.lifeTotal = lifeTotal;
  }

  changeName(name) {
    this.name = name;
  }

  setLifeTotal(lifeTotal) {
    this.lifeTotal = lifeTotal;
  }
}

export default Player;
