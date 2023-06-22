/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class TripButtonBar extends Component {
  handlePress = () => {
    // Handle button press
  };

  render() {
    return (
      <View style={styles.tripButtonsWrapper}>
        <View style={styles.chat}>
          <TouchableOpacity onPress={this.handlePress}>
            <View style={styles.buttonWrapper}>
              <View>
                <Icon name="chat" color={'#2F2F2C'} size={26} />
              </View>
              <Text style={styles.text}>Chat</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.call}>
          <TouchableOpacity onPress={this.handlePress}>
            <View style={styles.buttonWrapper}>
              <View>
                <Icon name="phone" color={'#2F2F2C'} size={26} />
              </View>
              <Text style={styles.text} numberOfLines={2}>
                Cuộc gọi miễn phí
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.helpCenter}>
          <TouchableOpacity onPress={this.handlePress}>
            <View style={styles.buttonWrapper}>
              <View>
                <Icon name="help" color={'#2F2F2C'} size={26} />
              </View>
              <Text style={[styles.text]} numberOfLines={2}>
                Trung tâm hỗ trợ
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.more}>
          <TouchableOpacity onPress={this.handlePress}>
            <View style={styles.buttonWrapper}>
              <View>
                <Icon name="more-horiz" color={'#2F2F2C'} size={26} />
              </View>
              <Text style={styles.text}>Xem thêm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tripButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    // alignItems: 'center',
    height: 90,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  chat: {
    alignItems: 'center',
    width: 80,
  },
  call: {
    alignItems: 'center',
    width: 80,
  },
  helpCenter: {
    alignItems: 'center',
    width: 80,
  },
  money: {
    alignItems: 'center',
    width: 80,
  },
  more: {},
  text: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#2F2F2C',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
});

export default TripButtonBar;
