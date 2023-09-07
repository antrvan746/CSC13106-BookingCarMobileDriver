/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectPaymentScreenState, setPaymentScreenState } from '../redux/PaymentScreen';


const PaymentSuccessButton = ({ state, onPress }) => {
  const paymentScreenState = useAppSelector(selectPaymentScreenState);
  let buttonText = '';
  if (paymentScreenState.state === 'InProgress') {
    buttonText = 'Tiến Hành';
  } else if (paymentScreenState.state === 'Confirming') {
    buttonText = 'Xác nhận';
  }
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.acceptButton}>
          <Text style={[styles.acceptText]}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  acceptText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelText: {
    fontSize: 20,
    color: '#58A6DE',
    fontWeight: 'bold',
  },
  cancleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    elevation: 8,
    shadowColor: 'black',
    width: 160,
    height: 60,
    borderRadius: 10,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#13B45D',
    elevation: 8,
    shadowColor: 'black',
    width: 160,
    height: 60,
    borderRadius: 10,
  },
});

export default PaymentSuccessButton;
