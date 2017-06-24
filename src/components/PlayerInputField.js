import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';

const PlayerInputField = ({
  onPress,
  value,
  currentValue
}) => {
  const chosenStyle = (value === currentValue) ? { opacity: 1 } : {};
  return (
    <TouchableOpacity onPress={onPress.bind(null, value)}>
      <View style={[ styles.player, chosenStyle ]}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  player: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    height: 96,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    opacity: 0.8
  },
  value: {
    color: '#35F4A2',
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold',
    fontSize: 64
  }
}

export default PlayerInputField;
