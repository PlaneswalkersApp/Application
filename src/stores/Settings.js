import { observable, action, computed } from 'mobx';

class Settings {
  planeId;
  localPlaneId;
  localId;
  @observable localNickname;
  @observable localInitialLifeTotal;

  constructor() {
    this.localPlaneId = generateId();
    this.localId = generateId();
    this.planeId = generateId();

    this.setLocalNickname();
    this.setLocalInitialLifeTotal();
  }

  @action setPlaneId(planeId = this.localPlaneId) {
    this.planeId = planeId;
  }

  @action setLocalNickname(localNickname = '') {
    this.localNickname = localNickname;
  }

  @action setLocalInitialLifeTotal(initialLifeTotal = 20) {
    this.localInitialLifeTotal = initialLifeTotal
  }

  @computed get host () {
    return this.localPlaneId === this.planeId
  }
}

function generateId() {
  return Math.random().toString(36).substr(2, 4);
}

export default Settings;
