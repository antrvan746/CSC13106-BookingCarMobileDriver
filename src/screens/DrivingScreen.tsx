/* eslint-disable prettier/prettier */
import {View, StyleSheet, Text} from 'react-native';
import React, {Component} from 'react';

import DrivingStatus from '../components/DrivingStatus';
import TripInfor from '../components/TripInfor';
import TripButtonBar from '../components/TripButtonBar';
import TripHandleButtons from '../components/TripHandleButtons';
export class DrivingScreen extends Component {
  render() {
    return (
      <View style={styles.containerWrapper}>
        <View>
          <Text>Map</Text>
        </View>
        <View style={styles.secondWrapper}>
          <View style={styles.drivingStatusComponent}>
            <DrivingStatus />
          </View>
          <View style={styles.tripInforComponent}>
            <TripInfor />
          </View>
          <View style={styles.tripButtonBarComponent}>
            <TripButtonBar />
          </View>
          <View style={styles.tripHandleButtonsComponent}>
            <TripHandleButtons />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    position: 'relative',
  },
  secondWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',
    flexDirection: 'column',
  },
  drivingStatusComponent: {},
  tripInforComponent: {},
  tripButtonBarComponent: {},
  tripHandleButtonsComponent: {},
});

export default DrivingScreen;
