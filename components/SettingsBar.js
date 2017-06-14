import React, { PropTypes } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SettingsBar = ({ children }) => {
  return (
    <View style={style.view}>
      {children}
    </View>
  )
}

const style = StyleSheet.create({
  view: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SettingsBar;
