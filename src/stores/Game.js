import { observable, computed, action } from 'mobx';

import Immutable from 'immutable';
import Card from './Card';
import Player from './Player';

const MINIMUM_INITIAL_LIFE_TOTAL = 1;
const MTG_URI = 'https://api.deckbrew.com/mtg';

class Game {
  ws;
  @observable players;
  @observable initialLifeTotal;
  @observable cardHistory;

  constructor(initialPlayers = 2, initialLifeTotal = 20, started = false) {
    this.started = started;
    this.initialLifeTotal = initialLifeTotal;
    this.players = [];
    this.cardHistory = [];

    this.setPlayers(initialPlayers);
  }

  start() {
    this.ws = new WebSocket('ws://localhost:8080', 'echo-protocol');

    this.ws.onopen = () => {
      // this.ws.send('{ "type": "ADD_CARD", "cardId": 3 }');
    }

    this.ws.onmessage = ({data}) => {
      try {
        const json = JSON.parse(data);
        this.handleMessage(json);
      } catch (e) {
        console.log('Invalid JSON.');
      }
    }
  }

  handleMessage(message) {
    switch(message.type) {
      case 'ADD_CARD': {
        this.addCard(message.cardId);
        break;
      }

      default: {
        break;
      }
    }
  }

  setPlayers(amount) {
    const players = [];

    for (let i = 0; i < amount; i++) {
      players.push(new Player(i, this.initialLifeTotal));
    }

    this.players = players;
  }

  @action increaseInitialLifeTotal(value) {
    this.initialLifeTotal += value;
  }

  @action decreaseInitialLifeTotal(value) {
    if (this.initialLifeTotal - value > MINIMUM_INITIAL_LIFE_TOTAL) {
      this.initialLifeTotal -= value;
    } else {
      this.initialLifeTotal = MINIMUM_INITIAL_LIFE_TOTAL;
    }
  }

  @action reset() {
    this.cardHistory = [];
    this.players.forEach(player => { player.setLife(this.initialLifeTotal); });
  }

  @action async addCard(cardId) {
    try {
      const response = await fetch(`${MTG_URI}/cards?multiverseid=${cardId}`);
      const json = await response.json();

      this.cardHistory.push({
        card: new Card(json[0], cardId)
      });
    } catch (e) {
      console.log('Request failed.');
    }
  }
}

export default Game;
