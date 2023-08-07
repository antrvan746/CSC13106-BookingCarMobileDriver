/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Text, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, UserLocationChangeEvent } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Navigations
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';
import DrivingBottomSheet from '../components/DrivingBottomSheet';
import GlobalServices from '../services/GlobalServices';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Driving'> { }


const DrivingScreen = ({ navigation, route }: Props): JSX.Element => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [mapLayoutReady, setMapLayoutReady] = useState(false);

  const tripId = route.params.tripId;
  const drivingScreenState = useAppSelector(selectDrivingScreenState);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log(position);
      },
      error => console.log('Error getting location: ', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
    GlobalServices.RideWs.Connect(route.params.tripId)
  }, []);

  const region = currentLocation
    ? {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    : undefined;

  const handleUserLocationChange = (event: UserLocationChangeEvent) => {
    // Update the currentLocation state with the new user location
    if (!event.nativeEvent.coordinate) {
      return
    }
    const { latitude, longitude } = event.nativeEvent.coordinate;
    // console.log('Moving:', latitude, longitude);
    setCurrentLocation({ latitude, longitude });
  };

  const [animation, setAnimation] = useState<{
    transform: {
      translateY: Animated.AnimatedInterpolation<string | number>;
    }[]
  } | {}>({});

  const [isInBottomSheet, setInBottomSheet] = useState(false);

  return (
    <View style={styles.containerWrapper}>
      {currentLocation ? (
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
      ) : (
        <View style={{ flex: 1 }} onLayout={() => setMapLayoutReady(true)}>
          <Text>Loading...</Text>
        </View>
      )}
      <View
        onTouchStart={() => { setInBottomSheet(true) }}
        onTouchEnd={() => { setInBottomSheet(false) }}
        style={styles.bottomSheetWrapper}>
        <DrivingBottomSheet navigation={navigation} route={route} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: "pink"
  },
  bottomSheetWrapper: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "green"
  }
});

export default DrivingScreen;
