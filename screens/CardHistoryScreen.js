import React, { PropTypes } from 'react'
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import Swiper from 'react-native-swiper';
import AppStore from '../stores/App';

class CardHistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Card History'
  };

  render () {
    return null;
  }
}

const styles = {
  slide: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'transparent'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    flex: 1
  }
}

export default CardHistoryScreen;

/*
import React, { PropTypes } from 'react'
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import Swiper from 'react-native-swiper';
import AppStore from '../stores/App';

@observer
class CardHistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Card History',
    headerBackTitle: 'Game'
  };

  render () {
    const swiperItems = AppStore.game.cardHistory.map(({card}) =>
      <View style={styles.slide} >
        <Image style={styles.image} resizeMode="contain" source={{ uri: card.image }} />
      </View>
    )
    .toArray();

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Swiper
          height={480}
          loop={false}
        >
          {swiperItems}
       </Swiper>
     </View>
    )
  }
}

const styles = {
  slide: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'transparent'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    flex: 1
  }
}

export default CardHistoryScreen;

*/
