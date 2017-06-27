import React, { PropTypes } from 'react'
import { View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import PlayerInputField from '../components/PlayerInputField';

@inject('app')
@observer
class RoomSelectionScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      position: 'absolute',
      top: 0,
      marginLeft: 6,
      marginRight: 6,
    },
    headerTintColor: '#FFFFFF'
  });

  constructor(props) {
    super();

    this.state = {
      planeId: ''
    }
  }

  onChangePlaneId(value) {
    this.setState({
      ...this.state,
      planeId: value.toLowerCase()
    });
  }

  onSetRoom() {
    this.props.app.settings.setPlaneId(this.state.planeId);
    this.props.navigation.navigate('NicknameSelection');
  }

  render () {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>PLANE TO JOIN</Text>

        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputFieldLabel}>PLANE ID</Text>
          <TextInput style={styles.inputField} onChangeText={this.onChangePlaneId.bind(this)} value={this.state.planeId} autoCorrect={false} />
        </View>

        <TouchableOpacity onPress={this.onSetRoom.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>SET PLANE</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  view: {
    flex: 1,
    backgroundColor: '#E75A7C',
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inputFieldContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'white',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  inputFieldLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'HK Grotesk'
  },
  inputField: {
    height: 80,
    width: 200,
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'HK Grotesk',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  life: {
    fontSize: 64,
    color: '#FFFFFF',
    fontFamily: 'HK Grotesk',
    fontWeight: '900',
    textAlign: 'center'
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 32,
    paddingRight: 32
  },
  buttonText: {
    textAlign: 'center',
    color: '#E75A7C',
    fontSize: 24,
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  }
}

export default RoomSelectionScreen;
