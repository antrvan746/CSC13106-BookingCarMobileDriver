/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useRef } from 'react';
import { Animated, Button, PanResponder, Platform, StyleSheet, Text, View } from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants/Dimenstions';

// Navigations
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectMainScreenState, setMainScreenState } from '../redux/MainScreen';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';
import { selectPaymentScreenState, setPaymentScreenState } from '../redux/PaymentScreen';
import DrivingStatus from './DrivingStatus';
import TripButtonBar from './TripButtonBar';
import TripHandleButtons from './TripHandleButtons';
import TripInfor from './TripInfor';


interface Props extends NativeStackScreenProps<RootStackParamList, 'Driving'> { }

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.44;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.16;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const BottomSheet = ({ navigation, route }: Props): JSX.Element => {


  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;
        // if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        // } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        // }

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    console.log('direction', direction);
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const dispatch = useAppDispatch();
  const drivingScreenState = useAppSelector(selectDrivingScreenState);
  let buttonText = 'Đã đến';

  const handleTripStateButtonPress = () => {
    if (drivingScreenState.state === 'Arriving') {
      buttonText = 'Đã đón';
      dispatch(setDrivingScreenState({ state: 'Arrived' }));
    } else if (drivingScreenState.state === 'Arrived') {
      buttonText = 'Đã trả';
      dispatch(setDrivingScreenState({ state: 'Carrying' }));
    } else if (drivingScreenState.state === 'Carrying') {
      buttonText = 'Đã đến';
      dispatch(setDrivingScreenState({ state: 'Finished' }));
      dispatch(setDrivingScreenState({ state: 'Arriving' }));
      dispatch(setPaymentScreenState({ state: 'InProgress' }));
      navigation.navigate('Payment', { paymentId: '1238721267' });
    }
    // else if (drivingScreenState.state === 'Finished') {
    //   dispatch(setDrivingScreenState({ state: 'Arriving' }));
    // }
  };

  const handleOffButtonPress = () => {
    dispatch(setMainScreenState({ state: 'Unavailable' }));
    dispatch(setDrivingScreenState({ state: 'Arriving' }));
    navigation.replace('Main');
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} >
          <View style={styles.dragHandle} />
        </View>
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
      </Animated.View>
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

export default BottomSheet;
