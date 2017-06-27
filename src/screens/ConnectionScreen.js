import React, { PropTypes } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';

@inject('app')
@observer
class ConnectionScreen extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
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
    ).then(() => {
      if (!props.app.settings.host) {
        props.app.game.socket.on('start', () => {
          props.navigation.navigate('Game');
        });
      }
    });
  }

  onStartGame() {
    this.props.app.game.preStartGame(
      this.props.app.settings.planeId,
      this.props.app.settings.localInitialLifeTotal
    );

    this.props.app.game.start(this.props.app.settings.localInitialLifeTotal);
    this.props.navigation.navigate('Game')
  }

  render () {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>
          {this.props.app.game.connected ? (
            `CONNECTED TO ${this.props.app.settings.planeId}`
          ): (
            `CONNECTING TO ${this.props.app.settings.planeId}`
          )}
        </Text>

        <View style={styles.connectedPlayerList}>
          {this.props.app.game.connected && (
            this.props.app.game.players.map(player => <View style={styles.playerContainer}>
                {player.leader && <Icon name="star" style={styles.leaderIcon}/>}
                <Text key={player.id} style={styles.player}>{player.nickname}</Text>
              </View>
            )
          )}
        </View>

        <View>
          {(this.props.app.game.connected && this.props.app.settings.host) && (
            <TouchableOpacity onPress={this.onStartGame.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>WARP TO PLANE</Text>
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
    backgroundColor: '#FCA17D',
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  },
  connectedPlayerList: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leaderIcon: {
    marginLeft: 8,
    marginRight: 8,
    color: '#FFD700',
    fontSize: 32
  },
  player: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'HK Grotesk',
    textAlign: 'center',
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
    color: '#FCA17D',
    fontSize: 24,
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  }
}

export default ConnectionScreen;
