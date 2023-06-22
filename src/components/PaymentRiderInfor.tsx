/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import PaymentMethod from './PaymentMethod';
import PaymentPrice from './PaymentPrice';

export class PaymentRiderInfor extends Component {
  render() {
    return (
      <View>
        <View style={styles.wrapper}>
          <Text style={styles.riderName}>Nguyễn Ngọc Anh Thư</Text>
          <PaymentMethod />
        </View>
        <PaymentPrice />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  riderName: {
    fontSize: 16,
    color: '#F9F9F9',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PaymentRiderInfor;
