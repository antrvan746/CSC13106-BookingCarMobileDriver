/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class DrivingStatus extends Component {
  render() {
    return (
      <View style={styles.statusWrapper}>
        <View style={styles.locationInfor}>
          <Text>DrivingStatus</Text>
          <Text>Địa điểm</Text>
        </View>
        <View style={styles.stepInfor}>
          <Text>1 • Đón khách</Text>
          <Text>GrabBike</Text>
        </View>
        <View style={styles.nagivateButton}>
          <Text>DrivingStatus</Text>
          <Text>Điều hướng</Text>
        </View>
      </View>
    );
  }
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
});

export default DrivingStatus;
