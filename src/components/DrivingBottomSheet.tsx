/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants/Dimenstions';

// Navigations
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Screen';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectMainScreenState, setMainScreenState } from '../redux/MainScreen';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';
import { selectPaymentScreenState, setPaymentScreenState } from '../redux/PaymentScreen';

// Animations
import BottomBox from './Animations/BottomBox';

// Services
import GlobalServices from '../services/GlobalServices';


// Components
import DrivingStatus from './DrivingStatus';
import TripButtonBar from './TripButtonBar';
import TripHandleButtons from './TripHandleButtons';
import TripInfor from './TripInfor';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Driving'> { }

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.44;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.16;


function BottomSheet2({ navigation, route }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const drivingScreenState = useAppSelector(selectDrivingScreenState);
  let buttonText = 'Đã đến';
  const handleTripStateButtonPress = () => {
    if (drivingScreenState.state === 'Arriving') {
      buttonText = 'Đã đón';
      GlobalServices.RideWs.SendMessage("DriverArrivePick");
      dispatch(setDrivingScreenState({ state: 'Arrived' }));

    } else if (drivingScreenState.state === 'Arrived') {

      buttonText = 'Đã trả';
      GlobalServices.RideWs.SendMessage("DriverStratTrip");
      dispatch(setDrivingScreenState({ state: 'Carrying' }));

    } else if (drivingScreenState.state === 'Carrying') {
      buttonText = 'Đã đến';
      GlobalServices.RideWs.SendMessage("DriverArriveDrop");

      dispatch(setDrivingScreenState({ state: 'Finished' }));
      dispatch(setDrivingScreenState({ state: 'Arriving' }));
      dispatch(setPaymentScreenState({ state: 'InProgress' }));

      console.log("Going to payment")
      try {
        GlobalServices.RideWs.Close();
        navigation.navigate('Payment', { paymentId: '1238721267' });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleOffButtonPress = () => {
    dispatch(setMainScreenState({ state: 'Unavailable' }));
    dispatch(setDrivingScreenState({ state: 'Arriving' }));
    navigation.replace('Main');
  };

  return (

    <View style={styles.secondWrapper}>
      <View style={styles.drivingStatusComponent}>
        <DrivingStatus />
      </View>

      <View style={styles.seperateLine} />

      <View style={styles.tripInforComponent}>
        <TripInfor />
      </View>

      <View style={styles.seperateLine} />

      <View style={styles.tripButtonBarComponent}>
        <TripButtonBar />
      </View>
      <View style={styles.tripHandleButtonsComponent}>
        <TripHandleButtons buttonText={buttonText}
          handleTripState={handleTripStateButtonPress}
          handleOffState={handleOffButtonPress} />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    width: 132,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  seperateLine: {
    width: WINDOW_WIDTH,
    height: 2,
    marginVertical: 5,
    marginRight: 8,
    backgroundColor: '#d3d3d3',
    opacity: 0.6,
    borderRadius: 10,
  },
  secondWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  drivingStatusComponent: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  tripInforComponent: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  tripButtonBarComponent: {},
  tripHandleButtonsComponent: {},
});

export default function (props: Props) {
  return <BottomBox
    content={<BottomSheet2 {...props} />}
    box_max_h={BOTTOM_SHEET_MAX_HEIGHT} box_min_h={BOTTOM_SHEET_MIN_HEIGHT} />
};
