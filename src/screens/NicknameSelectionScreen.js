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
      marginRight: 6,
      color: 'white'
    }
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
        <View>
          <View style={styles.information}>
            <Text style={styles.title}>CHOOSE A NICKNAME</Text>
          </View>
          <View style={styles.inputFieldContainer}>
            <TextInput style={styles.inputField} onChangeText={this.onChangeNickname.bind(this)} value={this.state.planeId} />
          </View>
        </View>
        <TouchableOpacity onPress={this.onSetNickname.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}></Text>
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
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  inputField: {
    height: 80,
    width: 200
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
