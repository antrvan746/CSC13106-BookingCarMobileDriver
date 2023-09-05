/* eslint-disable prettier/prettier */
import { Text, View, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import React, { Component } from 'react';

const DrivingStatus = () => {
  function onPress() {
    const startLatitude = 10.78825445546148; // Replace with your start latitude
    const startLongitude = 106.69380051915194; // Replace with your start longitude
    const endLatitude = 10.775111871794604; // Replace with your end latitude
    const endLongitude = 106.69234499244654; // Replace with your end longitude

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLatitude},${startLongitude}&destination=${endLatitude},${endLongitude}&travelmode=driving`;

    Linking.canOpenURL(googleMapsUrl).then(supported => {
      if (supported) {
        Linking.openURL(googleMapsUrl);
      } else {
        console.error("Google Maps is not available on this device.");
      }
    });
  }
  return (
    <View style={styles.statusWrapper}>
      <View style={styles.locationInfor}>
        <Text>DrivingStatus</Text>
        <Text>Địa điểm</Text>
      </View>

      <View style={styles.stepInfor}>
        <Text>Đón khách</Text>
        <Text>GrabBike</Text>
      </View>
      <View style={styles.nagivateButton}>
        <Text>Chỉ đường</Text>
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
          <Image
            source={require('../assets/icons/navigator-64.png')} // Replace with the actual path to your image
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationInfor: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepInfor: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  nagivateButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {

  },
  buttonImage: {
    width: 24,
    height: 24,
  },
});

export default DrivingStatus;
