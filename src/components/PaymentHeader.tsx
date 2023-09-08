/* eslint-disable prettier/prettier */
import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';

export class PaymentHeader extends Component {
  render() {
    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{"Thanh toán qua Thẻ / Ví"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#F9F9F9',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default PaymentHeader;
