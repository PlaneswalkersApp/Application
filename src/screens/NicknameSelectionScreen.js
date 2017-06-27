import React, { PropTypes } from 'react'
import { View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import PlayerInputField from '../components/PlayerInputField';

@inject('app')
@observer
class NicknameSelectionScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      position: 'absolute',
      top: 0,
      marginLeft: 6,
      marginRight: 6
    },
    headerTintColor: '#FFFFFF'
  });

  constructor(props) {
    super();

    this.state = {
      nickname: ''
    }
  }

  onChangeNickname(value) {
    this.setState({
      ...this.state,
      nickname: value
    });
  }

  onSetNickname() {
    this.props.app.settings.setLocalNickname(this.state.nickname);
    this.props.navigation.navigate('Connection');
  }

  render () {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>CHOOSE A NICKNAME</Text>

        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputFieldLabel}>NICKNAME</Text>
          <TextInput style={styles.inputField} onChangeText={this.onChangeNickname.bind(this)} value={this.state.planeId} autoCorrect={false}/>
        </View>

        <TouchableOpacity onPress={this.onSetNickname.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>SET NICKNAME</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  view: {
    flex: 1,
    backgroundColor: '#35F4A2',
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
    color: '#35F4A2',
    fontSize: 24,
    fontFamily: 'HK Grotesk',
    fontWeight: 'bold'
  }
}

export default NicknameSelectionScreen;
