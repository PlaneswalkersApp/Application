import React, { PropTypes } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';

@inject('app')
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    props.app.endGame();
  }

  onStartGame() {
    this.props.app.createGame();
    this.props.navigation.navigate('LifeSelection');
  }

  render () {
    return (
      <View>
        <Button title="START A NEW GAME" onPress={this.onStartGame.bind(this)}/>
      </View>
    );
  }
}

const styles = {
  view: {
    flex: 1
  }
}

export default HomeScreen;
