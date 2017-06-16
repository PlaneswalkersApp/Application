import React from 'react';
import { View, Button, Text, Animated, TouchableOpacity } from 'react-native';

class LifeInputField extends React.Component {
  constructor() {
    super();

    this.state = {
      scale: new Animated.Value(0)
    }
  }

  onPressIncrement() {
    this.props.onPressIncrease(this.props.value);

    Animated.sequence([
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 100
      }),
      Animated.timing(this.state.scale, {
        toValue: 0,
        duration: 100
      })
    ]).start();
  }

  onPressDecrement() {
    this.props.onPressDecrease(this.props.value);

    Animated.sequence([
      Animated.timing(this.state.scale, {
        toValue: -1,
        duration: 100
      }),
      Animated.timing(this.state.scale, {
        toValue: 0,
        duration: 100
      })
    ]).start();
  }

  render() {
    const incrementScale = this.state.scale.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0.85, 1, 1.15]
    });

    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={this.onPressIncrement.bind(this)}>
          <View style={styles.increment}>
            <Text style={styles.incrementText}>+</Text>
          </View>
        </TouchableOpacity>
        <Animated.View style={{...styles.value, transform: [{ scale: incrementScale }] }}>
          <Text style={styles.valueText}>{this.props.value}</Text>
        </Animated.View>
        <TouchableOpacity onPress={this.onPressDecrement.bind(this)}>
          <View style={styles.decrement}>
            <Text style={styles.decrementText}>-</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  view: {
    alignItems: 'center'
  },
  value: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    marginLeft: 16,
    marginRight: 16
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E71D36'
  },
  increment: {
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 44
  },
  decrement: {
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 44
  },
  incrementText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: 'HK Grotesk',
    fontSize: 32
  },
  decrementText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: 'HK Grotesk',
    fontSize: 32
  }
}

export default LifeInputField;
