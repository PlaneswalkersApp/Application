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
    title: 'Life selection',
    headerRight: <Button title="Game" onPress={() => { navigation.navigate('Game', {
      players: 2
    })}}
    />
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
      <View>
        <Text>{this.props.app.game.initialLifeTotal}</Text>
        {lifeInputFields}
        <TouchableOpacity onPress={this.onSetInitialLifeTotal.bind(this)}>
          <View><Text>Set life</Text></View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  view: {
    flex: 1
  }
}

export default LifeSelectionScreen;
