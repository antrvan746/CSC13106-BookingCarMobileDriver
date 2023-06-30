/* eslint-disable prettier/prettier */
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

// Redux
import { useAppSelector } from '../redux/hook';
import { selectDrivingScreenState } from '../redux/DrivingScreen';


const TripHandleButtons = ({ buttonText, handlePress }) => {
  const handleOffButtonPress = () => {
    // handle off button
  };
  const drivingScreenState = useAppSelector(selectDrivingScreenState);

  if (drivingScreenState.state === 'Arriving') {
    buttonText = 'Đã đến';
  } else if (drivingScreenState.state === 'Arrived') {
    buttonText = 'Đã đón';
  } else if (drivingScreenState.state === 'Carrying') {
    buttonText = 'Đã trả';
  } else if (drivingScreenState.state === 'Finished') {
    buttonText = 'Đã đến';
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.stateButtonWrapper}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.tripState}>
            <Text style={[styles.stateText]}>{buttonText}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.offButtonWrapper}>
        <TouchableOpacity onPress={handleOffButtonPress}>
          <View style={styles.offButton}>
            <Icon name="power" size={28} color={'#F9F9F9'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stateButtonWrapper: {
    paddingLeft: 20,
  },
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
  stateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tripState: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#13B45D',
    elevation: 8,
    shadowColor: 'black',
    width: 270,
    height: 50,
    borderRadius: 50,
  },
  offButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#13B45D',
    elevation: 8,
    shadowColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  iconWrapper: {},
  offButtonWrapper: {
    paddingRight: 20,
  },
});

export default TripHandleButtons;
