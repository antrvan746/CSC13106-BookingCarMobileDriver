/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Text } from 'react-native';
import React from 'react';

// Components
import DrivingStatus from '../components/DrivingStatus';
import TripInfor from '../components/TripInfor';
import TripButtonBar from '../components/TripButtonBar';
import TripHandleButtons from '../components/TripHandleButtons';

// Navigations
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectMainScreenState, setMainScreenState } from '../redux/MainScreen';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';
import { selectPaymentScreenState, setPaymentScreenState } from '../redux/PaymentScreen';


type DrivingScreenRouteProp = RouteProp<RootStackParamList, 'Driving'>;
type DrivingScreenNavigationProp = NavigationProp<RootStackParamList, 'Driving'>;

type DrivingScreenProps = {
  route: DrivingScreenRouteProp;
  navigation: DrivingScreenNavigationProp;
};

const DrivingScreen = ({ navigation, route }: DrivingScreenProps): JSX.Element => {
  const { tripId } = route.params;
  let buttonText = 'Đã đến';
  const drivingScreenState = useAppSelector(selectDrivingScreenState);
  const paymentScreenState = useAppSelector(selectPaymentScreenState);
  const mainScreenState = useAppSelector(selectMainScreenState);


  const dispatch = useAppDispatch();

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
    // TODO: it needs to replace current screen by the Main screen
    // navigation.replace('Main');
    dispatch(setDrivingScreenState({ state: 'Arriving' }));
    navigation.navigate('Main');
  };

  return (
    <View style={styles.containerWrapper}>
      <View>
        <Text>Map</Text>
        <Text>{tripId}</Text>
        <Text>{drivingScreenState.state}</Text>
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
          <TripHandleButtons buttonText={buttonText} handleTripState={handleTripStateButtonPress} handleOffState={handleOffButtonPress} />
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

export default DrivingScreen;
