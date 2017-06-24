import React, { PropTypes } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';

@inject('app')
class ConnectionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    props.app.game.start()
      .then(() => {
        props.navigation.navigate('GameScreen');
      })
      .catch(() => {
      });
  }

  render () {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>CONNECTING</Text>
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
