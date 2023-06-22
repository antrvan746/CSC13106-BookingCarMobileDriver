/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class DrivingStatus extends Component {
  render() {
    return (
      <View style={styles.statusWrapper}>
        <View style={styles.locationInfor}>
          <Text>DrivingStatus</Text>
          <Text>DrivingStatus</Text>
        </View>
        <View style={styles.stepInfor}>
          <Text>DrivingStatus</Text>
        </View>
        <View style={styles.nagivateButton}>
          <Text>DrivingStatus</Text>
          <Text>DrivingStatus</Text>
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
  },
  stepInfor: {
    flexDirection: 'column',
  },
  nagivateButton: {
    flexDirection: 'column',
  },
});

export default DrivingStatus;
