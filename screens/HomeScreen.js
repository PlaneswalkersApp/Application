import React, { PropTypes } from 'react'
import { View, Text, Button } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: <Button title="Select players" onPress={() => { navigation.navigate('PlayerSelection', {
      players: 2
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

export default HomeScreen;
