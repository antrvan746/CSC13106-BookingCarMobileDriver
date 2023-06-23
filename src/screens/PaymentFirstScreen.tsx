/* eslint-disable prettier/prettier */
import {View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import PaymentHeader from '../components/PaymentHeader';
import PaymentRiderInfor from '../components/PaymentRiderInfor';
import PaymentSuccessButton from '../components/PaymentSuccessButton';
import PaymentFailButton from '../components/PaymentFailButton';
import PaymentPrice from '../components/PaymentPrice';

export class PaymentFirstScreen extends Component {
  handleCancel = () => {
    // Handle cancel action
  };

  handleContinue = () => {
    // Handle cancel action
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.paymentHeaderComponent}>
          <PaymentHeader />
        </View>
        <View style={styles.paymentRiderInforComponent}>
          <PaymentRiderInfor />
          <View style={styles.paymentInforComponent}>
            <PaymentPrice screen="PaymentFirstScreen" />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <PaymentFailButton text="Huỷ" onPress={this.handleCancel} />
          <PaymentSuccessButton
            text="Tiến hành"
            onPress={this.handleContinue}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#747B89',
  },
  paymentHeaderComponent: {
    marginTop: 25,
  },
  paymentRiderInforComponent: {
    paddingHorizontal: 15,
    marginTop: 30,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    marginBottom: 50,
  },
  paymentInforComponent: {
    // paddingHorizontal: 15,
  },
});

export default PaymentFirstScreen;
