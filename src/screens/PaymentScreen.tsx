/* eslint-disable prettier/prettier */
import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import PaymentHeader from '../components/PaymentHeader';
import PaymentRiderInfor from '../components/PaymentRiderInfor';
import PaymentSuccessButton from '../components/PaymentSuccessButton';
import PaymentFailButton from '../components/PaymentFailButton';
import PaymentPrice from '../components/PaymentPrice';

// Navigations
import { RootStackParamList } from '../../App';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectPaymentScreenState, setPaymentScreenState } from '../redux/PaymentScreen';
import PaymentTotalCost from '../components/PaymentTotalCost';
import PaymentNote from '../components/PaymentNote';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Payment'> {

}
const PaymentScreen = ({ navigation, route }: Props): JSX.Element => {
  const { paymentId } = route.params;
  const paymentScreenState = useAppSelector(selectPaymentScreenState);
  const dispatch = useAppDispatch();

  // Handle cancel action
  const handleCancel = () => {
    if (paymentScreenState.state === 'InProgress') {
      navigation.navigate('Driving', { tripId: '123' });
    } else if (paymentScreenState.state === 'Confirming') {
      dispatch(setPaymentScreenState({ state: 'InProgress' }));
    }
  };

  // Handle continue action
  const handleContinue = () => {
    if (paymentScreenState.state === 'InProgress') {
      dispatch(setPaymentScreenState({ state: 'Confirming' }));
    } else if (paymentScreenState.state === 'Confirming') {
      navigation.navigate('CongratsPayment', { paymentId: '1238721267' });
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.paymentHeaderComponent}>
        <PaymentHeader />
      </View>
      <View style={styles.paymentRiderInforComponent}>
        <PaymentRiderInfor />
        <View style={styles.paymentInforComponent}>
          <PaymentPrice state={paymentScreenState.state} />
          <Text>Payment ID: {paymentId}</Text>
          <Text>State: {paymentScreenState.state}</Text>
        </View>
        {paymentScreenState.state !== 'InProgress' && (
          <><View style={styles.totalCostComponent}>
            <PaymentTotalCost />
          </View><View style={styles.paymentNoteComponent}>
              <PaymentNote />
            </View></>
        )}
      </View>
      <View style={styles.buttonWrapper}>
        <PaymentFailButton state={paymentScreenState.state} onPress={handleCancel} />
        <PaymentSuccessButton
          state={paymentScreenState.state}
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#747B89',
  },
  paymentHeaderComponent: {
    marginTop: 25,
  },
  paymentRiderInforComponent: {
    paddingHorizontal: 15,
    marginTop: 30,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    marginBottom: 50,
  },
  paymentInforComponent: {
    // paddingHorizontal: 15,
  },
  totalCostComponent: {
    marginTop: 10,
  },
  paymentNoteComponent: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default PaymentScreen;
