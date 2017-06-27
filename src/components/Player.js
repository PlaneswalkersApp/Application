import React, { PropTypes } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Player = ({
  nickname,
  life,
  color,
  lifeChange,
}) => {
  return (
    <View style={style.view}>
      <TouchableOpacity style={[style.increment, { backgroundColor: color }]} onPress={() => { lifeChange(1)}}>
      </TouchableOpacity>
      <View style={style.lifeContainer}>
        <Text style={style.nickname}>{nickname}</Text>
        <Text style={style.life}>{life}</Text>
        <Icon name="heart" style={style.heart}/>
      </View>
      <TouchableOpacity style={[style.decrement, { backgroundColor: color }]} onPress={() => { lifeChange(-1) }}>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  decrement: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  lifeContainer: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  nickname: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'HK Grotesk',
    textAlign: 'center'
  },
  heart: {
    fontSize: 32,
    fontFamily: 'HK Grotesk',
    color: '#000000',
    textAlign: 'center',
    zIndex: 2
  },
  life: {
    fontSize: 96,
    fontFamily: 'HK Grotesk',
    color: '#000000',
    textAlign: 'center',
    zIndex: 2
  }
};

export default Player;
