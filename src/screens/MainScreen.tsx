/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, UserLocationChangeEvent } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// Componenents
import Revenue from '../components/Revenue';
import Layer from '../components/Layer';
import StatusBar from '../components/CustomStatusBar';
import StatusButton from '../components/StatusButton';
import UserAvatar from '../components/UserAvatar';
import NavigationBar from '../components/NavigationBar';
import BottomSheet from '../components/BottomSheet';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectMainScreenState, setMainScreenState } from '../redux/MainScreen';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';
import { PERMISSIONS, request } from 'react-native-permissions';
import GlobalServices from '../services/GlobalServices';



type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;



const MainScreen = ({ navigation, route }: MainScreenProps) => {
  const mainScreenState = useAppSelector(selectMainScreenState);
  const drivingScreenState = useAppSelector(selectDrivingScreenState);
  const lastUpdateCoord = useRef<number>(0);

  const dispatch = useAppDispatch();

  if (mainScreenState.state === "Unavailable") {
    GlobalServices.DriverPoll.Close();
  }

  const handleStatusButtonPress = () => {
    dispatch(setMainScreenState({
      state: mainScreenState.state === 'Available' ? 'Unavailable' : 'Available',
    }));
  };

  const handleStateChange = () => {
    dispatch(setDrivingScreenState({
      state: drivingScreenState.state === 'Arriving' ? 'Arriving' : 'Arriving',
    }));
    navigation.replace('Driving', { tripId: '123' });
    // navigation.navigate('Login', { accountPhoneNumber: '0827615245' });
  };

  const goToLoginScreen = () => {
    navigation.replace('Login');
    // navigation.navigate('Login', { accountPhoneNumber: '0827615245' });
  };

  const goToWelcomeScreen = () => {
    navigation.replace('Welcome');
    // navigation.navigate('Login', { accountPhoneNumber: '0827615245' });
  };

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    lastUpdateCoord.current = Math.floor(Date.now() / 1000);

    const requestLocationPermission = async () => {
      try {
        // Request location permission for Android
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ]);

          if (granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        }

        // Request location permission for iOS
        if (Platform.OS === 'ios') {
          const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (status === 'granted') {
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        }
      } catch (error) {
        console.log('Error requesting location permission: ', error);
      }
    };

    requestLocationPermission();

    GlobalServices.DriverPoll.listeners.onRideReq = (req) => {
      Alert.alert("Found a ride", ` From: ${req.sadr} \n To: ${req.eadr}`,
        [
          {
            text: "Accept",
            onPress: () => {
              GlobalServices.DriverPoll.Close();
              dispatch(setMainScreenState({ state: "Unavailable" }));
              navigation.replace("Driving", { tripId: req.trip_id })
            }
          },
          {
            text: "Decline",
            style: 'cancel'
          }
        ]);
      return true;
    }
  }, []);

  const [isInBottomSheet, setInBottomSheet] = useState(false);
  // Update the region prop whenever the currentLocation changes
  const region = !currentLocation ? undefined : {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log(position);
        console.log("Geohash: ", GlobalServices.GeoHash.encode(latitude, longitude, 4))
      },
      error => console.log('Error getting location: ', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 20000 }
    );
  };

  const handleUserLocationChange = (event: UserLocationChangeEvent) => {
    // Update the currentLocation state with the new user location
    if (event.nativeEvent.coordinate) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      const geoHash = GlobalServices.GeoHash.encode(latitude, longitude, 4);
      if (!currentLocation?.latitude || !currentLocation.longitude) {
        setCurrentLocation({ latitude, longitude });
        fetch("http://10.0.2.2:3080/loc/driver/test_driver", {
          method: "POST",
          headers: {
            'Accept': '*',
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            lon: longitude,
            lat: latitude,
            g: "w3gv"
          })
        }).then(c => console.log("Update driver loc: ", c.status));
        return
      }

      if (GlobalServices.GeoHash.distance_meters(
        latitude, longitude,
        currentLocation.latitude, currentLocation.longitude) >= 100) {
        setCurrentLocation({ latitude, longitude });
        console.log("Geohash: ", geoHash);
        if (mainScreenState.state === "Available") {
          GlobalServices.DriverPoll.Connect(geoHash);
          fetch("http://10.0.2.2:3080/loc/driver/test_driver", {
            method: "POST",
            body: JSON.stringify({
              lon: currentLocation.longitude,
              lat: currentLocation.latitude,
              g: "w3gv"
            })
          }).then(c => console.log("Update driver loc: ", c.status));
        }

      }
      // console.log('Moving:', latitude, longitude);
    }

  };

  return (
    <View style={styles.containerWrapper}>
      {!currentLocation ? null :

        <MapView
          scrollEnabled={!isInBottomSheet}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation // enables the blue dot
          onUserLocationChange={handleUserLocationChange} // update the marker position
        >
          <Marker coordinate={currentLocation} title="Current Location" />
        </MapView>
      }
      <View style={styles.firstWrapper}>
        <Revenue />
        <View style={{ width: 210 }} />
        <UserAvatar />
      </View>
      <View
        onTouchStart={(e) => { setInBottomSheet(true) }}
        onTouchEnd={() => { setInBottomSheet(false) }}
        style={styles.secondWrapper}>
        <BottomSheet navigation={navigation} route={route} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    // position: 'relative',
  },
  firstWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    marginTop: 50,
  },
  secondWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 10,
    paddingRight: 20,
  },
  statusBarWrapper: {
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default MainScreen;
