import { observable, computed } from 'mobx';

class Card {
  guid
  multiverseId;
  info;

  constructor(guid, multiverseId, card) {
    this.guid = guid;
    this.multiverseId = multiverseId;
    this.info = { ...card };
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
