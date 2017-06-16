import React, { PropTypes } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Player = ({ life, color }) => {
  return (
    <View style={[style.view, { backgroundColor: color }]}>
      <View style={style.basicInfoContainer}>
        <Text style={style.life}>{life}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    margin: 4,
    borderRadius: 4,
    flex: 1
  },
  basicInfoContainer: {
  },
  life: {
    textAlign: 'center',
    fontSize: 96,
    fontFamily: 'HK Grotesk',
    color: '#FFFFFF'
  }
})

export default Player;
