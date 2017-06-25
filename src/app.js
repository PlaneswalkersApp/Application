import React from 'react';
import { Provider } from 'mobx-react/native';
import { StackNavigator } from 'react-navigation';

import AppStore from './stores/App'

import HomeScreen from './screens/HomeScreen';
import LifeSelectionScreen from './screens/LifeSelectionScreen';
import PlayerSelectionScreen from './screens/PlayerSelectionScreen';
import GameScreen from './screens/GameScreen';
import CardHistoryScreen from './screens/CardHistoryScreen';
import NotificationWrapperScreen from './screens/NotificationWrapperScreen';
import GameNavigationScreen from './screens/GameNavigationScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import NicknameSelectionScreen from './screens/NicknameSelectionScreen';
import RoomSelectionScreen from './screens/RoomSelectionScreen';

const StackNavigation = StackNavigator({
    Home: { screen: HomeScreen, },
    GameNavigation: { screen: GameNavigationScreen },
    Game: { screen: GameScreen },
    LifeSelection: { screen: LifeSelectionScreen },
    PlayerSelection: { screen: PlayerSelectionScreen },
    CardHistory: { screen: CardHistoryScreen },
    Connection: { screen: ConnectionScreen },
    NicknameSelection: { screen: NicknameSelectionScreen },
    RoomSelection: { screen: RoomSelectionScreen }
  }, {
    initialRouteName: 'Home',
    initialRouteProps: {
    }
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider app={AppStore}>
        <NotificationWrapperScreen>
          <StackNavigation />
        </NotificationWrapperScreen>
      </Provider>
    );
  }
}
