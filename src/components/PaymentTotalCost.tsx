/* eslint-disable prettier/prettier */
import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { useUserData } from '../contexts/UserDataContext';

export function PaymentTotalCost({ money }: { money: string }) {



  return (
    <View style={styles.wrapper}>
      <Text style={styles.totalText}>Tổng cộng</Text>
      <Text style={styles.totalCostText}>{money}</Text>
    </View>
  );

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
