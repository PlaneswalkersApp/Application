import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { inject } from 'mobx-react/native';

@inject('app')
class GameNavigationScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      position: 'absolute',
      top: 0,
      marginLeft: 6,
      marginRight: 6,
      color: 'white'
    }
  });

  onReset() {
    this.props.app.game.reset();
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  onNewGame() {

  }

  onCardHistory() {
    this.props.navigation.navigate('CardHistory');
  }

  render () {
    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={this.onNewGame.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>NEW GAME</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onReset.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>RESET</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onCardHistory.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>CARD HISTORY</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default GameNavigationScreen;

const styles = {
  view: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3F3B42'
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
    color: '#3F3B42',
    fontSize: 24,
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  }
}
