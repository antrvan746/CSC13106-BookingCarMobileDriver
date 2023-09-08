/* eslint-disable prettier/prettier */
import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import PaymentMethod from './PaymentMethod';
import { useUserData } from '../contexts/UserDataContext';

function PaymentRiderInfor({ name }: { name: string }) {


  return (
    <View>
      <View style={styles.wrapper}>
        {/* // TODO: MAP rider data */}
        <Text style={styles.riderName}>{name}</Text>
        <PaymentMethod />
      </View>
    </View>
  );

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
