/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet, TextInput} from 'react-native';
import React, {Component} from 'react';

export class PaymentPrice extends Component {
  handlePress = () => {};
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.priceWrapper}>
          <Text style={[styles.text]}>Giá cố định</Text>
          <Text style={[styles.text]}>125.000đ</Text>
        </View>
        <View style={styles.feeWrapper}>
          <Text style={[styles.text]}>Phụ phí</Text>
          <Text style={[styles.text]}>1.000đ</Text>
        </View>
        <View style={styles.tollsWrapper}>
          <Text style={[styles.text]}>Phí cầu đường</Text>
          <TextInput
            style={[styles.text, styles.inputFee]}
            placeholder="Số tiền"
            keyboardType="numeric">
            5.000đ
          </TextInput>
        </View>
        <View style={styles.extraFeeInputWrapper}>
          <Text style={[styles.text]}>Phụ phí</Text>
          <TextInput
            style={[styles.text, styles.inputFee]}
            placeholder="Số tiền"
            keyboardType="numeric">
            8.000đ
          </TextInput>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    position: 'relative',
    marginTop: 20,
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  feeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    color: '#F9F9F9',
    fontSize: 16,
  },
  tollsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  extraFeeInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputFee: {
    backgroundColor: '#48505F',
    textAlign: 'right',
    fontSize: 16,
    width: 170,
    height: 40,
    borderRadius: 5,
  },
});

export default PaymentPrice;
