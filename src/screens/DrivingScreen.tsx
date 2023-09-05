/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Text, Animated, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, UserLocationChangeEvent, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LocationIQ_Directions, useLazyGetRouteQuery } from "../query/LocationIQ";
import polyline from "@mapbox/polyline"


// Navigations
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';
import DrivingBottomSheet from '../components/DrivingBottomSheet';
import GlobalServices from '../services/GlobalServices';
import { DriverInfo } from '../services/RideWs';
import { current } from '@reduxjs/toolkit';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Driving'> { }


const DrivingScreen = ({ navigation, route }: Props): JSX.Element => {
  const drivingScreenState = useAppSelector(selectDrivingScreenState);
  const [isInBottomSheet, setInBottomSheet] = useState(false);
  const [mapLayoutReady, setMapLayoutReady] = useState(false);
  const [routeTrigger, routing] = useLazyGetRouteQuery();

  const [toPickRoute, setToPickRoute] = useState<{ latitude: number, longitude: number }[]>();
  const [toDropRoute, setToDropRoute] = useState<{ latitude: number, longitude: number }[]>();

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [animation, setAnimation] = useState<{
    transform: {
      translateY: Animated.AnimatedInterpolation<string | number>;
    }[]
  } | {}>({});

  const region = currentLocation
    ? {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    : undefined;

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
        });

        GetRouting(latitude, longitude, route.params.trip_data.slat, route.params.trip_data.slon,
          (p) => { setToPickRoute(DecodePolyline(p)) }
        );

        GetRouting(route.params.trip_data.slat, route.params.trip_data.slon,
          route.params.trip_data.elat, route.params.trip_data.elon,
          (p) => { setToDropRoute(DecodePolyline(p)) }
        );

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
    }
    GlobalServices.RideWs.Connect(route.params.trip_data.trip_id);



  }, []);

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

  function DecodePolyline(code: string): { latitude: number, longitude: number }[] {
    const coord = polyline.decode(code, 5)
    return coord.map(v => ({
      latitude: v[0],
      longitude: v[1]
    }))
  }

  async function GetRouting(lat1: number, lon1: number, lat2: number, lon2: number, callback: (poly: string) => void) {
    const { data } = await routeTrigger({
      coord: [
        { lat: lat1, lon: lon1 },
        { lat: lat2, lon: lon2 }
      ],
      apiKey: "pk.6290201b4314f0a31f29a0867aa0bf85"
    })
    if (data) {
      callback(data.routes[0].geometry);
    }
  }

  const mockData = {
    name: "Testing client",
    destination: "56/2 Dien Bien Phu, Phuong 26, Quan Binh Thanh",
    price: "125000",
  }

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
          <Marker coordinate={currentLocation} title="Current Location">
            <Image source={require('../assets/icons/scooter-64.png')} style={{ height: 32, width: 32 }} />
          </Marker>
          {/* Going to customer location */}
          {
            drivingScreenState.state === 'Arriving' && toPickRoute ?
              <>
                <Marker coordinate={currentLocation} title="Current Location">
                  <Image source={require('../assets/icons/scooter-64.png')} style={{ height: 32, width: 32 }} />
                </Marker>
                <Marker description={route.params.trip_data.sadr} pinColor='green'
                  coordinate={{ latitude: route.params.trip_data.slat, longitude: route.params.trip_data.slon }}>
                  <Image source={require('../assets/icons/rider-64.png')} style={{ height: 32, width: 32 }} />
                </Marker>
                <Polyline fillColor="#ded412" strokeWidth={5} strokeColor="#ded412"
                  coordinates={toPickRoute} />
              </>
              : null
          }

          {/* Picked customer */}
          {
            drivingScreenState.state === 'Carrying' && toDropRoute ?
              <>
                <Marker description={route.params.trip_data.sadr} pinColor='yellow'
                  coordinate={{ latitude: route.params.trip_data.slat, longitude: route.params.trip_data.slon }} />
                <Marker description={route.params.trip_data.eadr}
                  coordinate={{ latitude: route.params.trip_data.elat, longitude: route.params.trip_data.elon }}>
                  <Image source={require('../assets/icons/destination-64.png')} style={{ height: 32, width: 32 }} />
                </Marker>
                <Polyline fillColor="#1bcc29" strokeWidth={5} strokeColor="#1bcc29"
                  coordinates={toDropRoute} />
              </>
              : null
          }
        </MapView>
      )
        :
        (
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
