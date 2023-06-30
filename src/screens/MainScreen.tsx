/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
// import MapView, {Marker} from 'react-native-maps';

// Componenents
import Revenue from '../components/Revenue';
import Layer from '../components/Layer';
import StatusBar from '../components/StatusBar';
import StatusButton from '../components/StatusButton';
import UserAvatar from '../components/UserAvatar';
import NavigationBar from '../components/NavigationBar';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectMainScreenState, setMainScreenState } from '../redux/MainScreen';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainScreen = ({ navigation }: MainScreenProps) => {
  const mainScreenState = useAppSelector(selectMainScreenState);
  const drivingScreenState = useAppSelector(selectDrivingScreenState);

  const dispatch = useAppDispatch();

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
  };

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.firstWrapper}>
        <Revenue />
        <UserAvatar />
      </View>

      <View style={styles.secondWrapper}>
        <View style={styles.buttonWrapper}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <StatusButton handlePress={handleStatusButtonPress} />
          </View>

          <Layer />
        </View>

        <View style={styles.statusBarWrapper}>
          <StatusBar status={mainScreenState.state === 'Available' ? 'online' : 'offline'} />
          <Text>{mainScreenState.state}</Text>
          <Button title="Change state" onPress={handleStateChange} />
          <View style={{ marginBottom: 5, marginTop: 5 }}></View>
          <NavigationBar />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    position: 'relative',
  },
  firstWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  secondWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',
    flexDirection: 'column',
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
