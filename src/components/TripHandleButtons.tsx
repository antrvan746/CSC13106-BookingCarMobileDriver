/* eslint-disable prettier/prettier */
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Feather';

export class TripHandleButtons extends Component {
  state = {
    buttonText: 'Đã đến',
  };

  handleRidingStatePress = () => {
    const {buttonText} = this.state;
    let newButtonText = '';

    if (buttonText === 'Đã đến') {
      newButtonText = 'Đã đón';
    } else if (buttonText === 'Đã đón') {
      newButtonText = 'Đã trả';
    } else if (buttonText === 'Đã trả') {
      newButtonText = 'Đã đến';
    }

    this.setState({buttonText: newButtonText});
  };

  handleOffButtonPress = () => {
    // handle off button
  };

  render() {
    const {buttonText} = this.state;

    return (
      <View style={styles.wrapper}>
        <View style={styles.stateButtonWrapper}>
          <TouchableOpacity onPress={this.handleRidingStatePress}>
            <View style={styles.tripState}>
              <Text style={[styles.stateText]}>{buttonText}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.offButtonWrapper}>
          <TouchableOpacity onPress={this.handleOffButtonPress}>
            <View style={styles.offButton}>
              <Icon name="power" size={28} color={'#F9F9F9'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stateButtonWrapper: {
    paddingLeft: 20,
  },
  statusButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#2F2F2C',
    height: 46,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tripState: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#13B45D',
    elevation: 8,
    shadowColor: 'black',
    width: 270,
    height: 50,
    borderRadius: 50,
  },
  offButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#13B45D',
    elevation: 8,
    shadowColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  iconWrapper: {},
  offButtonWrapper: {
    paddingRight: 20,
  },
});

export default TripHandleButtons;
