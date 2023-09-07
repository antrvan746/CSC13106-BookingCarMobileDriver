/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState } from 'react';
import { Alert, Image, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

/// API
import { updateDriverLocation } from '../api/api';

// Map & Location
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, UserLocationChangeEvent } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

// Componenents
import Revenue from '../components/Revenue';
import UserAvatar from '../components/UserAvatar';
import BottomSheet from '../components/BottomSheet';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectMainScreenState, setMainScreenState } from '../redux/MainScreen';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';

// Services
import GlobalServices from '../services/GlobalServices';

// Context
import { useUserData } from '../contexts/UserDataContext';
import { RootStackParamList } from '../types/Screen';

const MainScreen = ({ navigation, route }: MainScreenProps) => {
  const mainScreenState = useAppSelector(selectMainScreenState);
  const drivingScreenState = useAppSelector(selectDrivingScreenState);

  const dispatch = useAppDispatch();
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isInBottomSheet, setInBottomSheet] = useState(false);
  const { driverData, setTripData } = useUserData();

  const handleStatusButtonPress = () => {
    console.log(mainScreenState.state === "Unavailable", currentLocation)

    if (mainScreenState.state === "Unavailable" && currentLocation) {
      sendUpdateCoord(currentLocation.latitude, currentLocation.longitude);
      GlobalServices.DriverPoll.Connect("w3gv");
    }

    dispatch(setMainScreenState({
      state: mainScreenState.state === 'Available' ? 'Unavailable' : 'Available',
    }));
  };

  const goToProfile = () => {
    navigation.navigate("Profile")
  }

  useEffect(() => {

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
              setTripData(req);
              dispatch(setMainScreenState({ state: "Unavailable" }));
              navigation.replace("Driving", { trip_data: req })
            }
          },
          {
            text: "Decline",
            style: 'cancel'
          }
        ]);
      return true;
    }

    return () => {
      GlobalServices.DriverPoll.listeners.onRideReq = undefined;
    }
  }, []);

  // Update the region prop whenever the currentLocation changes
  const region = !currentLocation ? undefined : {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function sendUpdateCoord(latitude: number, longitude: number) {
    const geoHash = GlobalServices.GeoHash.encode(latitude, longitude, 4);
    updateDriverLocation(driverData?.id, latitude, longitude);
  }

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
    // Update currentLocation to Go server
    if (event.nativeEvent.coordinate) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      if (!currentLocation?.latitude || !currentLocation.longitude) {
        setCurrentLocation({ latitude, longitude });
        sendUpdateCoord(latitude, longitude);
        return
      }

      if (GlobalServices.GeoHash.distance_meters(
        latitude, longitude,
        currentLocation.latitude, currentLocation.longitude) >= 100) {
        setCurrentLocation({ latitude, longitude });
        if (mainScreenState.state === "Available") {
          sendUpdateCoord(latitude, longitude);
        }
      }
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
          <Marker coordinate={currentLocation} title="Current Location">
            <Image source={require('../assets/icons/scooter-64.png')} style={{ height: 32, width: 32 }} />
          </Marker>
        </MapView>
      }

      <View style={styles.firstWrapper}>
        <Revenue />
        <View style={{ width: 210 }} />
        <TouchableOpacity onPress={goToProfile}><UserAvatar /></TouchableOpacity>

      </View>
      <View
        onTouchStart={(e) => { setInBottomSheet(true) }}
        onTouchEnd={() => { setInBottomSheet(false) }}
        style={styles.secondWrapper}>
        <BottomSheet navigation={navigation} route={route}
          onStatusBtnPress={handleStatusButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  firstWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
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
