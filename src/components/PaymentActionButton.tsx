/* eslint-disable prettier/prettier */
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class PaymentActionButton extends Component {
  handlePress = () => {};

  render() {
    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={this.handlePress}>
          <View style={styles.cancleButton}>
            <Text style={[styles.cancelText]}>Huỷ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handlePress}>
          <View style={styles.acceptButton}>
            <Text style={[styles.acceptText]}>Tiến hành</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  acceptText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelText: {
    fontSize: 20,
    color: '#58A6DE',
    fontWeight: 'bold',
  },
  cancleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    elevation: 8,
    shadowColor: 'black',
    width: 160,
    height: 60,
    borderRadius: 10,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#13B45D',
    elevation: 8,
    shadowColor: 'black',
    width: 160,
    height: 60,
    borderRadius: 10,
  },
});

export default PaymentActionButton;
