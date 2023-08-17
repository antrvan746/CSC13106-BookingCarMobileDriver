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
import { DriverInfo } from '../services/RideWs';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Driving'> { }


const DrivingScreen = ({ navigation, route }: Props): JSX.Element => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [mapLayoutReady, setMapLayoutReady] = useState(false);

  const tripId = route.params.tripId;
  const drivingScreenState = useAppSelector(selectDrivingScreenState);
  const [tripInfo, setTripInfo] = useState<DriverInfo>();
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log(position);
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
        })
      },
      error => console.log('Error getting location: ', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
    GlobalServices.RideWs.client_listeners.onDriverFound = (d) => {
      console.log(`Pick up data lat:${d.slat}, lon:${d.slon}, adr:${d.sadr})`);
      console.log(`Drop off data lat:${d.elat}, lon:${d.elon}, adr:${d.eadr})`);
      setTripInfo(d);
    }
    GlobalServices.RideWs.Connect(route.params.tripId);

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
        fetch("http://10.0.2.2:3080/loc/driver/test_driver", {
          method: "POST",
          body: JSON.stringify({
            lon: currentLocation.longitude,
            lat: currentLocation.latitude,
            g: "w3gv"
          })
        }).then(c => console.log("Update driver loc: ", c.status));

      }
      // console.log('Moving:', latitude, longitude);
    }

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
          {
            !tripInfo ? null :
              <>
                <Marker description={tripInfo.sadr} pinColor='yellow'
                  coordinate={{ latitude: tripInfo.slat, longitude: tripInfo.slon }} />
                <Marker description={tripInfo.eadr} pinColor='green'
                  coordinate={{ latitude: tripInfo.elat, longitude: tripInfo.elon }} />
              </>
          }
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
