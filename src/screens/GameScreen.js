import React, { PropTypes } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { observe } from 'mobx';
import { observer, inject } from 'mobx-react/native';
import Icon from '../config/icons';
import Player from '../components/Player';

@inject('app')
@observer
class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    observe(this.props.app.game.cardHistory, change => {
      this.props.screenProps.presentNotification({
        icon: <Icon name="card" style={{fontSize: 36, color: 'white' }}/>,
        title: 'A card has been played.',
        body: 'Player X played a card.',
        callback: () => { console.log('callback'); }
      });
    });
  }

  componentDidMount() {
    this.props.app.game.addCard(1);
  }

  onOpenGameNavigation() {
    this.props.navigation.navigate('GameNavigation');
  }

  render () {
    const players = this.props.app.game.players.map(player => <Player life={player.life} color={player.color} />);

    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={this.onOpenGameNavigation.bind(this)}>
          <View>
            <Text>Open navigation</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.playerField}>
          {players}
        </View>
      </View>
    );
  }
}

const styles = {
  view: {
    flex: 1
  },
  playerField: {
    flex: 1,
    flexDirection: 'row'
  }
}

export default GameScreen;


/**
import React, { PropTypes } from 'react'
import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react';
import AppStore from '../stores/App';

import Icon from '../config/icons';

import NotificationWrapperScreen from './NotificationWrapperScreen';
import SettingsBar from '../components/SettingsBar';
import Player from '../components/Player';

@observer
class GameScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Button title="Card History" onPress={() => { navigation.navigate('CardHistory', {})}} />
  });

  constructor() {
    super();

    const socket = new WebSocket('ws://localhost:8080', 'echo-protocol');

    socket.onmessage = (e) => {
      try {
        const parsedJSON = JSON.parse(e.data);
        AppStore.game.handleGameObject(parsedJSON)
          .then(() => {
            console.log('hello');
          })
          .catch((e) => {
            console.log(e);
          })
      } catch (e) {
        console.log('Invalid object.')
      }
    }
  }

  render () {
    const halfSize = Math.ceil(AppStore.game.players.size / 2);
    const playerFieldOne = AppStore.game.players.slice(0, halfSize).map(p => <Player {...p} />).toArray();
    const playerFieldTwo = AppStore.game.players.slice(halfSize, AppStore.game.players.size).map(p => <Player {...p} />).toArray();

    return (
      <View style={{flex: 1}}>
        <View style={styles.playerField}>
          {playerFieldOne}
        </View>
        <SettingsBar>
          <Button title={`Delete player`} onPress={() => { AppStore.game.deletePlayer() }}/>
          <Button title={`Add player`} onPress={() => { AppStore.game.addPlayer() }}/>
          <Button title={`${AppStore.game.format}`} onPress={() => { AppStore.game.changeFormat() }}/>
        </SettingsBar>
        <View style={styles.playerField}>
          {playerFieldTwo}
        </View>
      </View>
    )
  }
}

const styles = {
  view: {
    flex: 1
  },
  playerField: {
    flex: 1,
    flexDirection: 'row'
  }
}

export default GameScreen;
**/
