import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

class GameNavigationScreen extends React.Component {
  onReset() {
    this.props.game.reset();
  }

  onNewGame() {
  }

  onCardHistory() {
    this.props.navigation.navigate('CardHistory');
  }

  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.onCardHistory.bind(this)}>
          <View>
            <Text>Card history</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

/*
<TouchableOpacity onPress={this.onNewGame.bind(this)}>
  <View>
    <Text>New game</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={this.onReset.bind(this)}>
  <View>
    <Text>Reset</Text>
  </View>
</TouchableOpacity>
*/

export default GameNavigationScreen;
