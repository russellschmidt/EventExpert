import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

module.exports = React.createClass({
  render () {
    return (
      <View style={styles.container}>
        <Text>
          Event Expert
        </Text>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
