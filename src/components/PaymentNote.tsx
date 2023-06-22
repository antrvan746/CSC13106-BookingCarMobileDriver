/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class PaymentNote extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>Không thu tiền mặt</Text>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.contentText}>
            Bạn được thanh toán bằng Thẻ / Ví, vui lòng không thu tiền mặt
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    height: 74,
    width: 340,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 14,
  },
  titleWrapper: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  contentWrapper: {
    width: 280,
    paddingHorizontal: 10,
    paddingTop: 2,
  },
  contentText: {
    fontSize: 14,
  },
});

export default PaymentNote;
