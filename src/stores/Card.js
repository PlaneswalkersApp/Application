import { observable, computed } from 'mobx';

class Card {
  info;
  multiverseId;

  constructor(card, multiverseid) {
    this.info = { ...card };
    this.multiverseId = Number.parseInt(multiverseid);
  }

  @computed get name() {
    return this.info.name;
  }

  @computed get image() {
    return this.info.editions
      .find(edition => edition.multiverse_id === this.multiverseId)
      .image_url
  }
}

export default Card;
