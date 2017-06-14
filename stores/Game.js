import { DeviceEventEmitter } from 'react-native';
import { observable, computed, action } from 'mobx';
import Immutable from 'immutable';
import Player from './Player';
import Card from './Card';

const MTG_URI = 'https://api.deckbrew.com/mtg';
const availableFormats = Immutable.List([
  'VINTAGE',
  'LEGACY',
  'SEALED',
  'LIMITED',
  'STANDARD',
  'MODERN',
  'COMMANDER'
]);

class Game {
  id;
  presentNotification;
  @observable players;
  @observable cardHistory;

  constructor(presentNotification, format = availableFormats.find(format => format === 'STANDARD')) {
    this.id = guid();
    this.presentNotification = presentNotification;
    this.format = format;
    this.cardHistory = Immutable.List();
    this.players = Immutable.List([
      new Player('Player 1', this.formatSpecificInitialLifeTotal),
      new Player('Player 2', this.formatSpecificInitialLifeTotal)
    ]);

    const socket = new WebSocket('ws://localhost:8080', 'echo-protocol');

    socket.onopen = () => {
      socket.send('{ "type": "ADD_CARD", "cardID": 3, "playerID": 5}');
    }

    socket.onmessage = (e) => {
      try {
        const parsedJSON = JSON.parse(e.data);
        this.handleGameObject(parsedJSON);
      } catch (e) {
        console.log('Invalid object.')
      }
    }
  }

  setPlayers(number = 2) {
    this.players = number
  }

  setInitialLifeTotal(number = 20) {
    this.initialLifeTotal = number;
  }

  handleGameObject(gameObject) {
    switch(gameObject.type) {
      case 'ADD_CARD': {
        this.addCardToHistory(gameObject.cardID);
        break;
      }
    }
  }

  async addCardToHistory(cardID) {
    try {
      const response = await fetch(`${MTG_URI}/cards?multiverseid=${cardID}`);
      setTimeout(() => null, 0);
      const json = await response.json();

      if (json.length > 0) {
        this.addCard(new Card(
            guid(),
            cardID,
            json[0]
          ),
          1
        );
      }
    } catch (e) {
      console.log('Invalid request: ', e);
    }
  }

  @action deletePlayer() {
    this.players = this.players.pop();
  }

  @action addCard(card, playedBy) {
    this.cardHistory = this.cardHistory.unshift({
      card,
      playedBy
    });
  }

  @action addPlayer(name = `Player ${this.players.size + 1}`) {
    this.players = this.players.push(new Player(name, this.formatSpecificInitialLifeTotal));
  }

  @action changeFormat() {
    const index = availableFormats.findIndex(format => format === this.format);
    const newFormat = (index === availableFormats.size - 1) ? availableFormats.get(0) : availableFormats.get(index + 1);
    this.format = newFormat;

    this.players.forEach(player => {
      player.setLifeTotal(this.formatSpecificInitialLifeTotal)
    });
  }

  @computed get formatSpecificInitialLifeTotal () {
    switch (this.format) {
      case 'VINTAGE':
      case 'LEGACY':
      case 'SEALED':
      case 'LIMITED':
      case 'MODERN':
      case 'STANDARD': {
        return 20;
      }

      case 'TWO_HEADED_GIANT': {
        return 30;
      }

      case 'COMMANDER': {
        return 40;
      }
    }
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default Game;
