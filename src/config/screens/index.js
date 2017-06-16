import { Navigation } from 'react-native-navigation';

import HomeScreen from '../../screens/HomeScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('MakeCardsSmart.HomeScreen', () => HomeScreen);
}
