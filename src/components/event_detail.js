// event_detail.js
import React, {Component} from 'react';
import {
  Image,
  Linking,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class EventDetail extends Component {
  openUrl(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Can't open: ${url}`);
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={ () => this.props.navigator.pop() }
          >
            <Text style={styles.link}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => this.openUrl(this.props.url) }
          >
            <Text style={styles.link}>Full Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Image
            style={styles.detailImg}
            source={ {uri: this.props.img} }
          />
          <Text style={styles.title}>{this.props.title}</Text>
          <ScrollView>
            <Text style={styles.description}>{this.props.description}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  body: {
    flex: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: '#22F',
  },
  detailImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#d2d2d2',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
    paddingBottom: 15
  },
  description: {
    padding: 10,
  },
})

