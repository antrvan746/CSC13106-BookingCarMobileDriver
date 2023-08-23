/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useRef } from 'react';
import { Animated, Button, PanResponder, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import Icon from 'react-native-vector-icons/Feather';

interface MainScreenProps extends NativeStackScreenProps<RootStackParamList, 'Main'> {
  onStatusBtnPress: () => void
}

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.32;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.12;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;



function BottomSheet2({ navigation, onStatusBtnPress }: MainScreenProps) {
  const mainScreenState = useAppSelector(selectMainScreenState);
  const drivingScreenState = useAppSelector(selectDrivingScreenState);

  const dispatch = useAppDispatch();

  const handleStatusButtonPress = () => {
    onStatusBtnPress();
  };

  const handleStateChange = () => {
  };

  const goToLoginScreen = () => {
    navigation.replace('Login');
  };

  const goToWelcomeScreen = () => {
    navigation.replace('Welcome');
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
        <View>
          <TouchableOpacity onPress={handleStatusButtonPress}>
            <View style={styles.statusWrapper}>
              <Icon name="power" size={32} color={'#F9F9F9'} />
              <Text style={[styles.statusText]}>Bật kết nối</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* TODO: fix UI bug */}
      {/* <Layer /> */}
    </View>

    <View style={styles.statusBarWrapper}>
      <CustomStatusBar status={mainScreenState.state === 'Available' ? 'online' : 'offline'} />
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
  statusButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#2F2F2C',
    height: 46,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9F9F9',
  },

  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#2F2F2C',
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
  },
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
    position: 'absolute',
    paddingRight: 20,
    left: (WINDOW_WIDTH / 2) - (10),
    top: 40,
  },
  statusBarWrapper: {
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
