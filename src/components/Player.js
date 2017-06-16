import React, { PropTypes } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Player = ({ life }) => {
  return (
    <View style={style.view}>
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
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'grey',
    flex: 1
  },
  basicInfoContainer: {
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
  },
  life: {
    textAlign: 'center',
    fontSize: 64,
    fontWeight: 'bold'
  }
})

export default Player;
