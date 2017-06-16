import React, { PropTypes } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import LifeInputField from '../components/LifeInputField';

const LIFE_SELECTORS = [
  1,
  5,
  10
];

@inject('app')
@observer
class LifeSelectionScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      position: 'absolute',
      top: 0,
      marginLeft: 6,
      marginRight: 6,
      color: 'white'
    }
  });

  constructor() {
    super();
  }

  onPressIncrease(value) {
    this.props.app.game.increaseInitialLifeTotal(value);
  }

  onPressDecrease(value) {
    this.props.app.game.decreaseInitialLifeTotal(value);
  }

  onSetInitialLifeTotal() {
    this.props.navigation.navigate('PlayerSelection');
  }

  render () {
    const lifeInputFields = LIFE_SELECTORS.map(life => (
      <LifeInputField
        onPressIncrease={this.onPressIncrease.bind(this)}
        onPressDecrease={this.onPressDecrease.bind(this)}
        value={life}
      />
    ));

    return (
      <View style={styles.view}>
        <View>
          <View style={styles.information}>
            <Text style={styles.title}>INITIAL LIFE TOTAL</Text>
            <Text style={styles.life}>{this.props.app.game.initialLifeTotal}</Text>
          </View>
          <View style={styles.lifeInputFields}>
            {lifeInputFields}
          </View>
        </View>
        <TouchableOpacity onPress={this.onSetInitialLifeTotal.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>SET LIFE</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  lifeInputFields: {
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
    color: '#E71D36',
    fontSize: 24,
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  }
}

export default LifeSelectionScreen;
