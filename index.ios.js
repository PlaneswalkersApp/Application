import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import LifeSelectionScreen from './screens/LifeSelectionScreen';
import PlayerSelectionScreen from './screens/PlayerSelectionScreen';
import GameScreen from './screens/GameScreen';
import CardHistoryScreen from './screens/CardHistoryScreen';
import NotificationWrapperScreen from './screens/NotificationWrapperScreen';

const StackNavigation = StackNavigator({
    Home: { screen: HomeScreen },
    Game: { screen: GameScreen },
    LifeSelection: { screen: LifeSelectionScreen },
    PlayerSelection: { screen: PlayerSelectionScreen },
    CardHistory: { screen: CardHistoryScreen }
  }, {
    initialRouteName: 'Home',
    initialRouteProps: {
    }
  }
);

const App = () => {
  return (
    <NotificationWrapperScreen>
      <StackNavigation />
    </NotificationWrapperScreen>
  )
}

AppRegistry.registerComponent('MakeCardsSmart', () => App);
