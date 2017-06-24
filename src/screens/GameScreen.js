import React, { PropTypes } from 'react'
import { View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import { observe } from 'mobx';
import { observer, inject } from 'mobx-react/native';
import Icon from '../config/icons';
import Player from '../components/Player';

@inject('app')
@observer
class GameScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
    gesturesEnabled: false
  });

  constructor(props) {
    super(props);

    props.app.game.start();

    observe(this.props.app.game.cardHistory, change => {
      const { card } = change.added[0];

      this.props.screenProps.presentNotification({
        icon: <Icon name="card" style={{fontSize: 36, color: 'white' }}/>,
        title: 'A spell has been cast!',
        body: `A ${card.name} has been played.`,
        callback: () => { this.props.navigation.navigate('CardHistory'); }
      });
    });
  }

  onOpenGameNavigation() {
    this.props.navigation.navigate('GameNavigation');
  }

  render () {
    const halfSize = Math.ceil(this.props.app.game.players.length / 2);
    const playerFieldOne = this.props.app.game.players.slice(0, halfSize).map((player) => <Player
      key={player.color}
      life={player.life}
      color={player.color}
      incrementLife={() => { player.incrementLife(1); }}
      decrementLife={() => { player.decrementLife(1); }}
    />);
    const playerFieldTwo = this.props.app.game.players.slice(halfSize, this.props.app.game.players.length).map((player) => <Player
      key={player.color}
      life={player.life}
      color={player.color}
      incrementLife={() => { player.incrementLife(1); }}
      decrementLife={() => { player.decrementLife(1); }}
    />);

    return (
      <View style={styles.view}>
        <View style={styles.playerField}>
          {playerFieldOne}
        </View>
        <View style={styles.playerField}>
          {playerFieldTwo}
        </View>
        <View style={styles.settings}>
          <TouchableOpacity onPress={this.onOpenGameNavigation.bind(this)}>
            <Text style={styles.settingsIcon}>S</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  view: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#FFFFFF'
  },
  settings: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0 + (Dimensions.get('window').height / 2) - 32,
    left: 0 + (Dimensions.get('window').width / 2) - 32,
    zIndex: 5,
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 100
  },
  settingsIcon: {
    color: '#3F3B42'
  },
  playerField: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    zIndex: 0
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
