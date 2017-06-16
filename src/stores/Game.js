import { observable, computed, action } from 'mobx';

import Immutable from 'immutable';
import Card from './Card';
import Player from './Player';

const MINIMUM_INITIAL_LIFE_TOTAL = 1;
const MTG_URI = 'https://api.deckbrew.com/mtg';

class Game {
  initialPlayers;
  ws;
  @observable started;
  @observable players;
  @observable initialLifeTotal;
  @observable cardHistory;

  constructor(initialPlayers = 2, initialLifeTotal = 20, started = false) {
    this.started = started;
    this.initialLifeTotal = initialLifeTotal;
    this.players = [];
    this.cardHistory = [];
  }

  setPlayers(amount = this.initialPlayers) {
    const players = [];

    for (let i = 0; i < amount; i++) {
      players.push(new Player(this.initialLifeTotal));
    }

    this.players = [];
  }

  @action increaseInitialLifeTotal(value) {
    this.initialLifeTotal += value;
  }

  @action decreaseInitialLifeTotal(value) {
    if (this.initialLifeTotal - value > MINIMUM_INITIAL_LIFE_TOTAL) {
      this.initialLifeTotal -= MINIMUM_INITIAL_LIFE_TOTAL;
    }
  }

  @action reset() {
  }

  @action async addCard() {
    try {
      const response = await fetch(`${MTG_URI}/cards?multiverseid=3`);
      const json = await response.json();
      this.cardHistory.push({
        card: new Card(json[0], 3)
      });
    } catch (e) {

    }
  }
}

export default Game;
