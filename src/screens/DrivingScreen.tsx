/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Text } from 'react-native';
import React from 'react';

// Navigations
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';
import DrivingBottomSheet from '../components/DrivingBottomSheet';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Driving'> { }

const DrivingScreen = ({ navigation, route }: Props): JSX.Element => {
  const tripId = route.params.tripId;
  const drivingScreenState = useAppSelector(selectDrivingScreenState);

  return (
    <View style={styles.containerWrapper}>
      <View style={{ position: 'absolute' }}>
        <Text>Map</Text>
        <Text>{tripId}</Text>
        <Text>{drivingScreenState.state}</Text>
      </View>
      <DrivingBottomSheet navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    position: 'relative',
  },
});

export default DrivingScreen;
