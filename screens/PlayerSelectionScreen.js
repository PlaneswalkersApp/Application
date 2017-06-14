import React, { PropTypes } from 'react'
import { View, Text, Button } from 'react-native';

class PlayerSelection extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Player selection',
    headerRight: <Button title="Life selection" onPress={() => { navigation.navigate('LifeSelection', {
    })}} />
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

export default PlayerSelection;
