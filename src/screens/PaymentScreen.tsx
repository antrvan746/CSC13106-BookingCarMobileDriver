/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class PaymentScreen extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text>PaymentScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#48505F',
  },
});

export default PaymentScreen;
