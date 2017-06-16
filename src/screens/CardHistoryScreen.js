import React, { PropTypes } from 'react'
import { View, Text, Image, Button, StatusBar } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import Swiper from 'react-native-swiper';

@inject('app')
@observer
class CardHistoryScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      position: 'absolute',
      top: 0,
      marginLeft: 6,
      marginRight: 6,
      color: 'white'
    }
  });

  render () {
    const swiperItems = this.props.app.game.cardHistory.map(({card}) => {
      return <View style={styles.slide} >
        <Image style={styles.image} resizeMode="contain" source={{ uri: card.image }} />
      </View>
    });

    return (
      <View style={styles.view}>
        <StatusBar barStyle="dark-content" />
        {(this.props.app.game.cardHistory.length > 0) ? (
          <Swiper
            height={480}
            loop={false}
          >
            {swiperItems}
         </Swiper>
        ) : (
          <Text style={styles.noCards}>NO CARDS PLAYED YET</Text>
        )}
     </View>
    )
  }
}

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noCards: {
    fontSize: 32,
    color: '#000000',
    fontFamily: 'HK Grotesk',
    textAlign: 'center'
  },
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
