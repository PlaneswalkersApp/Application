import React, { PropTypes } from 'react'
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import Swiper from 'react-native-swiper';

@inject('app')
@observer
class CardHistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Card History',
    headerBackTitle: 'Game'
  };

  render () {
    console.log(this.props.app.game.cardHistory);
    const swiperItems = this.props.app.game.cardHistory.map(({card}) => {
      console.log(card);
      return <View style={styles.slide} >
        <Image style={styles.image} resizeMode="contain" source={{ uri: card.image }} />
      </View>
    });

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
