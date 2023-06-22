/* eslint-disable prettier/prettier */
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class FinishButton extends Component {
  handlePress = () => {};
  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={this.handlePress}>
          <View style={styles.finishButton}>
            <Text style={[styles.finishText]}>Xong</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#13B45D',
    elevation: 8,
    shadowColor: 'black',
    width: 360,
    height: 60,
    borderRadius: 10,
  },
  finishText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default FinishButton;
