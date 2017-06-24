import React, { PropTypes } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const Player = ({
  life,
  color,
  incrementLife,
  decrementLife
}) => {
  return (
    <View style={style.view}>
      <TouchableOpacity style={[style.increment, { backgroundColor: color }]} onPress={() => { incrementLife()}}>
      </TouchableOpacity>
        <Text style={style.life}>{life}</Text>
      <TouchableOpacity style={[style.decrement, { backgroundColor: color }]} onPress={() => { decrementLife() }}>
      </TouchableOpacity>
    </View>
  )
}

const style = {
  view: {
    margin: 4,
    flexDirection: 'column',
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
  },
  increment: {
    flex: 1,
    backgroundColor: 'red'
  },
  decrement: {
    flex: 1
  },
  basicInfoContainer: {
    zIndex: 200,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  life: {
    position: 'absolute',
    zIndex: 12312,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontSize: 96,
    fontFamily: 'HK Grotesk',
    color: '#000000'
  }
};

export default Player;
