/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';

// Components
import PaymentCongratsHeader from '../components/PaymentCongratsHeader';
import PaymentMethod from '../components/PaymentMethod';
import FinishButton from '../components/FinishButton';

// Navigations
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Screen';
interface Props extends NativeStackScreenProps<RootStackParamList, 'CongratsPayment'> {

}
const PaymentCongratsScreen = ({ navigation, route }: Props): JSX.Element => {
  const { paymentId } = route.params;
  const handleFinishTripButtonPress = () => {
    navigation.replace('Main');
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.paymentCongratsHeader}>
        <PaymentCongratsHeader />
      </View>
      <View style={styles.congratsImgWrapper}>
        <Image
          source={require('../assets/images/congrats.png')} // Replace with your image path
          style={styles.congratsImg}
        />
      </View>
      <View style={styles.revenueWrapper}>
        <Text style={styles.revenueTitleText}>Thu nhập ròng</Text>
        <Text style={styles.revenueContentText}>139.000đ</Text>
        <View style={styles.paymentMethodComponent}>
          <PaymentMethod />
        </View>
      </View>
      <View style={styles.finishButtonComponent}>
        <FinishButton handlePress={handleFinishTripButtonPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#747B89',
  },
  paymentCongratsHeader: {
    marginTop: 25,
  },
  congratsImgWrapper: {
    marginTop: 30,
  },
  congratsImg: {
    width: 420,
    height: 220,
  },
  revenueWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  revenueTitleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revenueContentText: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  paymentMethodComponent: {
    marginTop: 5,
  },
  finishButtonComponent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default PaymentCongratsScreen;
