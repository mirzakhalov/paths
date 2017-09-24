
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
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
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

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

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
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.005, longitudeDelta: 0.005, zoomControl: true }}
          onRegionChange={this._handleMapRegionChange}
        >
    <MapView.Marker
      coordinate={this.state.location.coords}
      title="My Marker"
      description="Some description"
    />
        </MapView>
      
      </View>
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