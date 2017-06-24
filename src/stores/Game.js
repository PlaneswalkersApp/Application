import { observable, computed, action } from 'mobx';
import socket from 'socket.io-client';
import Immutable from 'immutable';
import Card from './Card';
import Player from './Player';

const MINIMUM_INITIAL_LIFE_TOTAL = 1;
const MTG_URI = 'https://api.deckbrew.com/mtg';

class Game {
  ws;
  socket;
  planeId;
  @observable players;
  @observable initialLifeTotal;
  @observable cardHistory;

  constructor(planeId, initialPlayers = 2, initialLifeTotal = 20, started = false) {
    this.planeId = planeId;
    this.started = started;
    this.initialLifeTotal = initialLifeTotal;
    this.players = [];
    this.cardHistory = [];

    this.setPlayers(initialPlayers);
  }

  start() {
    return new Promise((resolve, reject) => {
      this.socket = socket('http://localhost:3000');

      this.socket.on('error', () => {
        console.log('error');
        if (!socket.socket.connected) {
          reject({
            type: 'NO_CONNECTION'
          });
        }
      });

      this.socket.on('connect', () => {
        resolve();
        this.onSocketConnect(resolve, reject);
      });

      this.socket.on('disconnect', () => {
        this.onSocketDisconnect();
      });

      this.socket.on('player', player => {
        this.handleNewPlayer();
      });

      this.socket.on('lifeChange', lifeChange => {
        this.handleLifeChange();
      });

      this.socket.on('cardPlayed', cardPlayed => {
        this.handleCardPlayed();
      });
    });
  }

  onSocketConnect() {
    const planeRegExp = new RegExp(/([a-zA-Z 0-9]){4}/)
    const planeId = this.planeId;

    if (planeRegExp.test(planeId)) {
      this.socket.emit('joinPlane', {
        planeId
      });
    } else {
      reject({
        type: 'INVALID_PLANE'
      });
    }
  }

  onSocketDisconnect() {

  }

  handleConnect() {

  }

  handleDisconnect() {

  }

  handleLifeChange() {

  }

  handleCardPlayed() {

  }

  handleNewPlayer() {

  }

  setPlaneId(planeId) {
    this.planeId = planeId;
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
