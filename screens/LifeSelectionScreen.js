import React, { PropTypes } from 'react'
import { View, Text, Button } from 'react-native';

class LifeSelectionScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Life selection',
    headerRight: <Button title="Game" onPress={() => { navigation.navigate('Game', {
        players: 2
      })}}
    />
  });

  constructor() {
    super();
  }

  render () {
    return null;
  }
}

const styles = {
  view: {
    flex: 1
  }
}

export default LifeSelectionScreen;
