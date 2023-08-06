/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useRef } from 'react';
import { Animated, Button, PanResponder, Platform, StyleSheet, Text, View } from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants/Dimenstions';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectMainScreenState, setMainScreenState } from '../redux/MainScreen';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';
import Layer from './Layer';
import StatusButton from './StatusButton';
import CustomStatusBar from './CustomStatusBar';
import NavigationBar from './NavigationBar';
import BottomBox from './Animations/BottomBox';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.32;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.12;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const BottomSheet = ({ navigation }: MainScreenProps) => {
  const mainScreenState = useAppSelector(selectMainScreenState);
  const drivingScreenState = useAppSelector(selectDrivingScreenState);

  const dispatch = useAppDispatch();

  const handleStatusButtonPress = () => {
    dispatch(setMainScreenState({
      state: mainScreenState.state === 'Available' ? 'Unavailable' : 'Available',
    }));
    navigation.navigate('Driving', { tripId: '123' });
  };

  const handleStateChange = () => {
    dispatch(setDrivingScreenState({
      state: drivingScreenState.state === 'Arriving' ? 'Arriving' : 'Arriving',
    }));
    navigation.replace('Driving', { tripId: '123' });
    // navigation.navigate('Login', { accountPhoneNumber: '0827615245' });
  };

  const goToLoginScreen = () => {
    navigation.replace('Login');
    // navigation.navigate('Login', { accountPhoneNumber: '0827615245' });
  };

  const goToWelcomeScreen = () => {
    navigation.replace('Welcome');
    // navigation.navigate('Login', { accountPhoneNumber: '0827615245' });
  };

  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
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
    // console.log('direction', direction);
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

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} >
          <View style={styles.dragHandle} />
        </View>
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
          {/* TODO: fix UI bug */}
          {/* <Layer /> */}
        </View>

        <View style={styles.statusBarWrapper}>
          <CustomStatusBar status={mainScreenState.state === 'Available' ? 'online' : 'offline'} />
          <Text>{mainScreenState.state}</Text>
          {/* <Button title="Change state" onPress={handleStateChange} />
          <Button title="Login Screen" onPress={goToLoginScreen} />
          <Button title="Welcome Screen" onPress={goToWelcomeScreen} /> */}
          <View style={styles.seperateLine} />
          <NavigationBar />
        </View>
      </Animated.View>
    </View>
  );
};

function BottomSheet2({ navigation }: MainScreenProps) {
  const mainScreenState = useAppSelector(selectMainScreenState);
  const drivingScreenState = useAppSelector(selectDrivingScreenState);

  const dispatch = useAppDispatch();

  const handleStatusButtonPress = () => {
    dispatch(setMainScreenState({
      state: mainScreenState.state === 'Available' ? 'Unavailable' : 'Available',
    }));
    navigation.navigate('Driving', { tripId: '123' });
  };

  const handleStateChange = () => {
    dispatch(setDrivingScreenState({
      state: drivingScreenState.state === 'Arriving' ? 'Arriving' : 'Arriving',
    }));
    navigation.replace('Driving', { tripId: '123' });
    // navigation.navigate('Login', { accountPhoneNumber: '0827615245' });
  };

  const goToLoginScreen = () => {
    navigation.replace('Login');
    // navigation.navigate('Login', { accountPhoneNumber: '0827615245' });
  };

  const goToWelcomeScreen = () => {
    navigation.replace('Welcome');
    // navigation.navigate('Login', { accountPhoneNumber: '0827615245' });
  };


  return (<>

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
      {/* TODO: fix UI bug */}
      {/* <Layer /> */}
    </View>

    <View style={styles.statusBarWrapper}>
      <CustomStatusBar status={mainScreenState.state === 'Available' ? 'online' : 'offline'} />
      <Text>{mainScreenState.state}</Text>
      {/* <Button title="Change state" onPress={handleStateChange} />
          <Button title="Login Screen" onPress={goToLoginScreen} />
          <Button title="Welcome Screen" onPress={goToWelcomeScreen} /> */}
      <View style={styles.seperateLine} />
      <NavigationBar />
    </View>
  </>
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
    width: WINDOW_WIDTH - 20,
    height: 2,
    marginVertical: 5,
    marginRight: 8,
    backgroundColor: '#d3d3d3',
    opacity: 0.6,
    borderRadius: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    position: 'absolute',
    paddingRight: 20,
    left: (WINDOW_WIDTH / 2) - (10),
    top: 40,
  },
  statusBarWrapper: {
    // backgroundColor: '#F1F1F1',
    // top: 250,
    top: 60,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default function (props: MainScreenProps) {
  return (<BottomBox
    content={<BottomSheet2 {...props} />}
    box_max_h={BOTTOM_SHEET_MAX_HEIGHT}
    box_min_h={BOTTOM_SHEET_MIN_HEIGHT} />)
};
