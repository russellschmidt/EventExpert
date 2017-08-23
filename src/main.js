import React, {Component} from 'react';
import {
  Navigator
} from 'react-native-deprecated-custom-components';


import Events from './components/events';

const routes = {
  events: Events
}

export default class Main extends Component {

  render () {
    return (
      <Navigator
        initialRoute={ {name: 'events'} }
        renderScene={this.renderScene}
      />
    )
  }

  renderScene(route, navigator) {
    let Component = routes[route.name];
    return (
      <Component
        navigator={navigator}
      />
    )
  }
}

