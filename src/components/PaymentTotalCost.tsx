/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class PaymentTotalCost extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.totalText}>Tổng cộng</Text>
        <Text style={styles.totalCostText}>139.000đ</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  totalCostText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PaymentTotalCost;
