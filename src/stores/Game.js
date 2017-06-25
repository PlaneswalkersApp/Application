import { observable, computed, action } from 'mobx';
import socket from 'socket.io-client';
import Immutable from 'immutable';
import Card from './Card';
import Player from './Player';

const MTG_URI = 'https://api.deckbrew.com/mtg';

class Game {
  ws;
  socket;
  planeId;
  @observable connected;
  @observable players;
  @observable cardHistory;

  constructor(planeId) {
    this.planeId = planeId;
    this.connected = false;

    this.players = [];
    this.cardHistory = [];
  }

  createPlayer(id, nickname, leader) {
    this.players.push(
      new Player(
        id,
        nickname,
        leader
      )
    );
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

      this.socket.on('playerJoined', player => {
        this.handleNewPlayer(player);
      });
    });
  }

  @action setConnected(connected) {
    this.connected = connected;
  }

  setInitialPlaneData(data) {
    data.initialPlaneData.players.forEach(player => {
      this.createPlayer(
        player.id,
        player.nickname,
        player.leader
      );
    });
  }

  start(initialLifeTotal) {
    this.socket.emit('start', {
      initialLifeTotal
    });
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

  @action reset() {
    this.cardHistory = [];
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
