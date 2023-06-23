/* eslint-disable prettier/prettier */
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export class PaymentFailButton extends Component<ButtonProps> {
  render() {
    const {text, onPress} = this.props;

    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.cancleButton}>
            <Text style={[styles.cancelText]}>{text}</Text>
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

export default PaymentFailButton;
