
import Expo from 'expo';
import { Constants, Location, Permissions, } from 'expo';
import React from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  CameraRoll,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import { MapView, } from 'expo';

// Main App Class starts here
export default class App extends React.Component {
  state = {
    location: null,
    error_message: null,
    // TODO Markers are used for test and should be changed afterwards
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: "Best Place",
        description: "This is the best place in Portland",
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: "Second Best Place",
        description: "This is the second best place in Portland",
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034,
        },
        title: "Third Best Place",
        description: "This is the third best place in Portland",
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917,
        },
        title: "Fourth Best Place",
        description: "This is the fourth best place in Portland",
      },
    ]
  };
  componentWillMount() {
    if(Platform.OS = 'android' && !Constants.isDevice) {
      this.setState({
        error_message: 'Oops, this will not work on an emulator',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    
  };
  
  render() {
       
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      var lat = this.state.location.coords.latitude;
      var long = this.state.location.coords.longitude;
    }
    
    return (
      <MapView
      style={styles.map}
      initialRegion={{
        latitude: parseFloat(long),
        longitude: parseFloat(lat),
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0032,
      }
  }
    />
    <Mapview.Marker coordinate = {marker.}>
      </Mapview.Marker>
      
    }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },

  map: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
  }
});