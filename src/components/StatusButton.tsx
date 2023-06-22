/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const StatusButton = ({handlePress}) => {
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.statusWrapper}>
          <Icon name="power" size={32} color={'#F9F9F9'} />
          <Text style={[styles.statusText]}>Bật kết nối</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handlePress}>
        <View style={styles.statusWrapper}>
          <Animated.View style={[styles.iconWrapper, {left: online ? 0 : -50}]}>
            <Icon name="power" size={32} color={iconColor} />
          </Animated.View>
          <Text style={[styles.statusText, {opacity: online ? 0 : 1}]}>
            Bật kết nối
          </Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
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
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9F9F9',
  },

  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#2F2F2C',
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
  },
  iconWrapper: {},
});

export default StatusButton;
