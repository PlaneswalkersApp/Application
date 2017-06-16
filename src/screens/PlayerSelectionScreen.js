import React, { PropTypes } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import PlayerInputField from '../components/PlayerInputField';

const MAX_AMOUNT_PLAYERS = [2, 3, 4];

@inject('app')
@observer
class PlayerSelection extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      position: 'absolute',
      top: 0,
      marginLeft: 6,
      marginRight: 6,
      color: 'white'
    }
  });
  constructor(props) {
    super(props);
  }

  onChoosePlayer(value) {
    this.props.app.game.setPlayers(value);
  }

  onSetPlayers() {
    this.props.navigation.navigate('Game');
  }

  render () {
    console.log(this.props.app.game.players);
    const playerInputFields = MAX_AMOUNT_PLAYERS.map(playerValue => (
      <PlayerInputField
        value={playerValue}
        currentValue={this.props.app.game.players.length}
        onPress={this.onChoosePlayer.bind(this)}
      />
    ));

    return (
      <View style={styles.view}>
        <View>
          <View style={styles.information}>
            <Text style={styles.title}>PLAYER AMOUNT</Text>
          </View>
          <View style={styles.playerInputFields}>
            {playerInputFields}
          </View>
        </View>
        <TouchableOpacity onPress={this.onSetPlayers.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>SET PLAYER AMOUNT</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  view: {
    flex: 1,
    backgroundColor: '#35F4A2',
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  playerInputFields: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  life: {
    fontSize: 64,
    color: '#FFFFFF',
    fontFamily: 'HK Grotesk',
    fontWeight: '900',
    textAlign: 'center'
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
    color: '#35F4A2',
    fontSize: 24,
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  }
}

export default PlayerSelection;
