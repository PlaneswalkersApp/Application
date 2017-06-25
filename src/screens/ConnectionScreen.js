import React, { PropTypes } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react/native';

@inject('app')
@observer
class ConnectionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    props.app.createGame(
      props.app.settings.planeId
    );

    props.app.game.connect(
      props.app.settings.localId,
      props.app.settings.localNickname,
      props.app.settings.host
    );
  }

  onStartGame() {
    this.props.app.game.start();
    this.props.navigation.navigate('Game');
  }

  render () {
    return (
      <View style={styles.view}>
        <View>
          <Text style={styles.title}>
            {this.props.app.game.connected ? (
              `CONNECTED TO ${this.props.app.settings.planeId}`
            ): (
              `CONNECTING TO ${this.props.app.settings.planeId}`
            )}
          </Text>
        </View>
        <View>
          {this.props.app.game.connected && (
            this.props.app.game.players.map(player => {
              return <Text key={player.id}>{player.nickname}</Text>
            })
          )}
        </View>
        <View>
          {this.props.app.settings.host && (
            <TouchableOpacity onPress={this.onStartGame.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}></Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = {
  view: {
    flex: 1,
    backgroundColor: '#E71D36',
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 32,
    paddingRight: 32
  },
  buttonText: {
    textAlign: 'center',
    color: '#E71D36',
    fontSize: 24,
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  }
}

export default ConnectionScreen;
