/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import PaymentHeader from '../components/PaymentHeader';
import PaymentRiderInfor from '../components/PaymentRiderInfor';
import PaymentActionButton from '../components/PaymentActionButton';
import PaymentTotalCost from '../components/PaymentTotalCost';
import PaymentNote from '../components/PaymentNote';
export class PaymentSecondScreen extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.paymentHeaderComponent}>
          <PaymentHeader />
        </View>
        <View style={styles.paymentRiderInforComponent}>
          <PaymentRiderInfor />
        </View>
        <View style={styles.totalCostComponent}>
          <PaymentTotalCost />
        </View>
        <View style={styles.paymentNoteComponent}>
          <PaymentNote />
        </View>
        <View style={styles.buttonWrapper}>
          <PaymentActionButton />
        </View>
      </View>
    );
  }
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
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    marginBottom: 50,
  },
  totalCostComponent: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  paymentNoteComponent: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default PaymentSecondScreen;
