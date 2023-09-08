/* eslint-disable prettier/prettier */
import { View, StyleSheet, Text } from 'react-native';
import React from 'react';

// Components
import PaymentHeader from '../components/PaymentHeader';
import PaymentRiderInfor from '../components/PaymentRiderInfor';
import PaymentSuccessButton from '../components/PaymentSuccessButton';
import PaymentFailButton from '../components/PaymentFailButton';
import PaymentPrice from '../components/PaymentPrice';
import PaymentTotalCost from '../components/PaymentTotalCost';
import PaymentNote from '../components/PaymentNote';

// Navigation
import { RootStackParamList } from '../types/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
interface Props extends NativeStackScreenProps<RootStackParamList, 'Payment'> {
}

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectPaymentScreenState, setPaymentScreenState } from '../redux/PaymentScreen';
import { useUserData } from '../contexts/UserDataContext';


const PaymentScreen = ({ navigation, route }: Props): JSX.Element => {
  const { paymentId } = route.params;
  const paymentScreenState = useAppSelector(selectPaymentScreenState);
  const dispatch = useAppDispatch();
  const { tripData } = useUserData();
  function formatPrice(price: number) {
    // Format the price with decimal places and add "đ" at the end
    const formattedPrice = price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedPrice;
  }
  // Handle cancel action
  const handleCancel = () => {
    if (paymentScreenState.state === 'InProgress') {
      if (tripData) {
        navigation.navigate('Driving', { trip_data: tripData });
      }
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
        <PaymentRiderInfor name={tripData?.user_name || "LAM"} />
        <View style={styles.paymentInforComponent}>
          <PaymentPrice state={paymentScreenState.state} />
          <Text>{`Payment ID: ${paymentId}`}</Text>
          <Text>{`State:  ${paymentScreenState.state}`}</Text>
        </View>
        {paymentScreenState.state !== 'InProgress' && (
          <>
            <View style={styles.totalCostComponent}>
              <PaymentTotalCost money={formatPrice((tripData?.price || 0) * 1000)} />
            </View><View style={styles.paymentNoteComponent}>
              <PaymentNote />
            </View>
          </>
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
