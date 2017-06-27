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
  }

  componentDidMount() {
  }

  onStartGame() {
    this.props.app.settings.setPlaneId();
    this.props.navigation.navigate('LifeSelection');
  }

  onJoinGame() {
    this.props.navigation.navigate('RoomSelection');
  }

  render () {
    return (
      <View style={styles.view}>
        <Text style={styles.appTitle}>Planeswalkers</Text>

        <View>
          <Text style={styles.title}>
            PLANE CODE
          </Text>

          <Text style={styles.title}>
            {this.props.app.settings.localPlaneId}
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={this.onJoinGame.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>JOIN PLANE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onStartGame.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>START A NEW PLANE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  view: {
    flex: 1,
    backgroundColor: '#40BCD8',
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 48,
    color: '#FFFFFF',
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 16
  },
  buttonText: {
    textAlign: 'center',
    color: '#40BCD8',
    fontSize: 24,
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  }
}

export default HomeScreen;
