import { observable, computed, action } from 'mobx';
import socket from 'socket.io-client';
import Immutable from 'immutable';
import Card from './Card';
import Player from './Player';

const MTG_URI = 'https://api.deckbrew.com/mtg';

class Game {
  ws;
  planeId;

  @observable socket;
  @observable connected;
  @observable started;

  @observable players;
  @observable cardHistory;
  @observable initialLifeTotal;

  constructor(planeId) {
    this.planeId = planeId;
    this.connected = false;
    this.started = { started: false};

    this.players = [];
    this.cardHistory = [];
  }

  connect(playerId, playerNickname, leader) {
    return new Promise((resolve, reject) => {
      this.socket = socket('http://localhost:3000');

      this.socket.on('error', () => {
        if (!socket.socket.connected) {
          reject({
            type: 'NO_CONNECTION'
          });
        }
      });

      this.socket.on('connect', () => {
        this.onSocketConnect(playerId, playerNickname, leader, resolve, reject);
      });

      this.socket.on('disconnect', () => {
        this.onSocketDisconnect();
      });

      this.socket.on('player', player => {
        this.handleNewPlayer(player);
      });

      this.socket.on('start', data => {
        this.start(data);
      })
    });
  }

  preStartGame(planeId, initialLifeTotal) {
    this.socket.emit('start', {
      planeId,
      initialLifeTotal
    });
  }

  @action start(initialLifeTotal) {
    this.initialLifeTotal = initialLifeTotal;
    this.started = true;
    this.setGameDefaults();

    this.socket.on('playerLifeChange', (data) => {
      this.changePlayerLife(data.playerId, data.lifeChange);
    });

    this.socket.on('cardPlayed', (data) => {
      this.addCard(data);
    });

    this.socket.on('reset', () => {
      this.setGameDefaults();
    });
  }

  @action emitReset(planeId) {
    this.socket.emit('reset', {
      planeId
    });
  }

  reset() {
    this.setGameDefaults();
  }

  @action setGameDefaults() {
    this.cardHistory = [];

    this.players.forEach(p => {
      p.setLife(this.initialLifeTotal);
    });
  }

  @action createPlayer(id, nickname, leader) {
    this.players.push(
      new Player(
        id,
        nickname,
        leader
      )
    );
  }

  emitChangePlayerLife(planeId, playerId, lifeChange) {
    this.socket.emit('playerLifeChange', {
      planeId,
      playerId,
      lifeChange
    });

    this.changePlayerLife(playerId, lifeChange);
  }

  @action changePlayerLife(playerId, lifeChange) {
    const planeId = this.planeId;

    if (this.players.find(player => player.id === playerId)) {
      const player = this.players.find(player => player.id === playerId);
      player.changeLife(lifeChange);
    }
  }

  @action setConnected(connected) {
    this.connected = connected;
  }

  setInitialPlaneData(data) {
    data.initialPlaneData.players.forEach(player => {
      this.createPlayer(
        player.playerId,
        player.nickname,
        player.leader
      );
    });
  }

  onSocketDisconnect() {

  }

  onSocketConnect(playerId, playerNickname, leader, resolve, reject) {
    const planeRegExp = new RegExp(/([a-zA-Z 0-9]){4}/)
    const planeId = this.planeId;

    if (planeRegExp.test(planeId)) {
      this.socket.emit('joinPlane', {
        planeId,
        playerId,
        playerNickname,
        leader
      });

      this.socket.on('joinedPlane', data => {
        if (data.joined) {
          this.setConnected(true);
          this.setInitialPlaneData(data);
          resolve();
        } else {
          this.setConnected(false);
          reject({
            type: 'NO_ROOM_CONNECTION'
          })
        }
      });
    } else {
      reject({
        type: 'INVALID_PLANE'
      });
    }
  }

  handleNewPlayer(player) {
    this.createPlayer(
      player.id,
      player.nickname,
      player.leader
    )
  }

  setPlaneId(planeId) {
    this.planeId = planeId;
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
