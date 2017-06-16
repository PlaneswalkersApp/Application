import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';

const PlayerInputField = ({
  onPress,
  value
}) => {
  return (
    <TouchableOpacity onPress={onPress.bind(null, value)}>
      <View>
        <Text>{value}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default PlayerInputField;
