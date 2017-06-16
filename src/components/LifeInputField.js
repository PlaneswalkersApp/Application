import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';

const LifeInputField = ({
  onPressDecrease,
  onPressIncrease,
  value
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPressIncrease.bind(null, value)}>
        <View>
          <Text>+ {value}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressDecrease.bind(null, value)}>
        <View>
          <Text>- {value}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default LifeInputField;
