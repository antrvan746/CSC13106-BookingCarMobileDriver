/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, View, StyleSheet, TextInput } from 'react-native';
import React from 'react';

interface PaymentPriceProps {
  state: string;
}

const PaymentPrice = ({ state }: PaymentPriceProps): JSX.Element => {
  const tollsInputBackgroundColor =
    state === 'InProgress' ? '#48505F' : 'transparent';
  const extraFeeInputBackgroundColor =
    state === 'InProgress' ? '#48505F' : 'transparent';
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
          style={[
            styles.text,
            styles.inputFee,
            { backgroundColor: tollsInputBackgroundColor },
          ]}
          placeholder="Số tiền"
          keyboardType="numeric"
          editable={state === 'InProgress'}>
          5.000đ
        </TextInput>
      </View>
      <View style={styles.extraFeeInputWrapper}>
        <Text style={[styles.text]}>Phụ phí</Text>
        <TextInput
          style={[
            styles.text,
            styles.inputFee,
            { backgroundColor: extraFeeInputBackgroundColor },
          ]}
          placeholder="Số tiền"
          keyboardType="numeric"
          editable={state === 'InProgress'}>
          8.000đ
        </TextInput>
      </View>
    </View>
  );
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
    textAlign: 'right',
    fontSize: 16,
    width: 170,
    height: 40,
    borderRadius: 5,
  },
});

export default PaymentPrice;
