

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './src/main';

export default class EventExpert extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('EventExpert', () => EventExpert);
