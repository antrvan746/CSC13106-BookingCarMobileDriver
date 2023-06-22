/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class PaymentMethod extends Component {
  render() {
    return (
      <View>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Thẻ / Ví</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#1288DE',
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    width: 74,
    borderRadius: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  line: {
    width: 200,
    backgroundColor: 'red',
    height: 1,
  },
});

export default PaymentMethod;
