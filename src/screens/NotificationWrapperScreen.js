import React from 'react'
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Animated, StatusBar } from 'react-native';
import Icon from '../config/icons';

class NotificationWrapper extends React.Component {
  _timeout = null;

  constructor() {
    super();

    this.state = {
      notificationActive: false,
      notificationAnimatedValue: new Animated.Value(0),
      notification: {
        icon: null,
        title: '',
        body: '',
        callback: null
      }
    }
  }

  presentNotification(notification) {
    this.setState({
      ...this.state,
      notification,
      notificationActive: true,
    });

    Animated.timing(
      this.state.notificationAnimatedValue, {
        toValue: 1,
        duration: 300
      }
    ).start();

    this._timeout = setTimeout(() => {
      this.removeNotification();
    }, 5000);
  }

  pressNotification() {
    this.state.notification.callback();
    this.removeNotification();
  }

  removeNotification() {
    this.setState({
      ...this.state,
      notificationActive: false,
    });

    Animated.timing(
      this.state.notificationAnimatedValue, {
        toValue: 0,
        duration: 300
      }
    ).start();

    this._timeout = null;

    setTimeout(() => {
      this.setState({
        ...this.state,
        notification: {
          icon: null,
          title: '',
          body: '',
          callback: null
        }
      });
    }, 300)
  }

  render () {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        screenProps: {
          presentNotification: this.presentNotification.bind(this)
        }
      })
    );

    const top = this.state.notificationAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-80, 0],
    });

    return (
      <View style={styles.view}>
        <Animated.View style={{ ...styles.notification, top }}>
          <StatusBar barStyle={(this.state.notificationActive) ? 'light-content' : 'dark-content' } />
          <View style={styles.statusBarDivider}></View>
          <TouchableOpacity onPress={this.pressNotification.bind(this)}>
            <View style={styles.notificationContent}>
              <View style={styles.iconContainer}>
                {this.state.notification.icon}
              </View>
              <View>
                <Text style={styles.title}>{this.state.notification.title}</Text>
                <Text style={styles.body}>{this.state.notification.body}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
        {childrenWithProps}
      </View>
    )
  }
}

const styles = {
  view: {
    flex: 1
  },
  statusBarDivider: {
    height: 20,
    marginBottom: 2
  },
  iconContainer: {
    paddingRight: 16
  },
  notificationContent: {
    flexDirection: 'row'
  },
  notification: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 76,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.85,
    zIndex: 72839413241
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 2
  },
  body: {
    color: 'white'
  }
}

export default NotificationWrapper;
