// events.js
import React, {Component} from 'react';
import {
  Platform,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ListView
} from 'react-native';

import Geocoder from 'react-native-geocoder';

const ROOT_URL = 'https://www.eventbriteapi.com/v3';
const EVENT_SEARCH = '/events/search/';
const MY_TOKEN = 'Bearer 734BI5DINA5X67M3P5RR';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});

export default class Events extends Component {
  constructor() {
    super();

    this.state = {
      dataSource: ds.cloneWithRows([
        {
          name: {
            text: 'Loading...'
          },
          url: 'www.russellschmidt.net',
          logo: {
            url: 'https://cdn.pixabay.com/photo/2013/11/20/09/35/question-mark-213671_960_720.jpg'
          },
        },
      ]),
      eventType: '',
      city: ''
    }
  }


  componentDidMount() {
    this.searchEvents('happy hour', 'Los Angeles');
  }

  searchEvents(category, city) {
    if (category !== '' && city !== '') {
      Geocoder.geocodeAddress(city).then(res => {

        let position = res[0].position;
        let locationStr = `&location.latitude=${position.lat}&location.longitude=${position.lng}`;
        let searchRadius = 25;
        let searchRadiusUnitOfMeasure = 'mi'; //or 'km'
        let radius = `&location.within=${searchRadius+searchRadiusUnitOfMeasure}`;

        let FETCH_URL = `${ROOT_URL+EVENT_SEARCH}?q=${category}${locationStr}${radius}`;

        fetch(FETCH_URL, {
          method: 'GET',
          headers: {
            'Authorization': MY_TOKEN
          }
        })
        .then((response) => response.json())
        .then((responseJSON) => {
             this.setState({dataSource: ds.cloneWithRows(responseJSON.events)})
        })
      })
    }
  }

  renderRow(rowData) {
    const defaultImg = 'https://cdn.pixabay.com/photo/2013/11/20/09/35/question-mark-213671_960_720.jpg';
    let img = rowData.logo ? rowData.logo.url : defaultImg;

    return (
      <View style={styles.row}>
        <Image
          style={styles.rowLogo}
          source={{uri: img}}
        />
        <View style={styles.rowDetails}>
          <Text style={styles.rowText}>
            {
              rowData.name.text.length > 50 ?
              `${rowData.name.text.substring(0,50)}...` :
              rowData.name.text
            }
          </Text>
          <TouchableOpacity
            onPress={ () => this.props.navigator.push({
              name: 'eventDetail'
            })}
          >
            <Text style={styles.link}>
              More Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Event Expert
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Type of event...'
            onChangeText={(text) => this.setState({eventType: text})}
          />
          <TextInput
            style={styles.input}
            placeholder='City...'
            onChangeText={(text) => this.setState({city: text})}
          />
          <TouchableOpacity
            onPress={() => this.searchEvents(this.state.eventType, this.state.city)}
            style={styles.buttonContainer}
          >
            <Text style={styles.button}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    flexShrink: 1,
    fontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue-CondensedBold' : 'Roboto',
    fontSize: (Platform.OS === 'android') ? 22 :24,
    letterSpacing: 1.5,
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {

    borderColor: '#e5e5e5',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    margin: 5,
    textAlign: 'center',
  },
  button: {
    borderColor: '#00F',
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#00D',
    padding: 2,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: '20%',
  },
  list: {
    padding: 5,
    flex: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
  },
  rowLogo: {
    flex: 1,
    width: 50,
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
  },
  rowDetails: {
    flex: 5,
    justifyContent: 'center',
  },
  rowText: {
    textAlign: 'left',
    paddingLeft: 10,
    fontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue-CondensedBold' : 'Roboto',
    fontSize: (Platform.OS === 'android') ? 16 : 14,
  },
  link: {
    textAlign: 'left',
    color: '#22F',
    paddingLeft: 10,
    fontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto',
    fontSize: (Platform.OS === 'android') ? 14 : 12,
  },
})
