import React, { PropTypes } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import PlayerInputField from '../components/PlayerInputField';

const MAX_AMOUNT_PLAYERS = [2, 3, 4];

@inject('app')
@observer
class PlayerSelection extends React.Component {
  constructor() {
    super();
  }

  onChoosePlayer(value) {
    this.props.app.game.setPlayers(value);
    this.props.navigation.navigate('Game');
  }

  render () {
    const playerInputFields = MAX_AMOUNT_PLAYERS.map(playerValue => (
      <PlayerInputField
        value={playerValue}
        onPress={this.onChoosePlayer.bind(this)}
      />
    ));

    return (
      <View>
        {playerInputFields}
      </View>
    )
  }
}

const styles = {
  view: {
    flex: 1
  }
}

export default PlayerSelection;
