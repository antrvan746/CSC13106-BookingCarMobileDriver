/* eslint-disable prettier/prettier */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface StatusTextProps {
  status: string;
}

const CustomStatusBar: React.FC<StatusTextProps> = ({ status }) => {
  const iconColor = status === 'online' ? '#13B45D' : '#E50101';
  return (
    <View style={styles.statusView}>
      <Icon name="circle" color={iconColor} size={16} />
      <Text style={styles.statusText}>
        Bạn đang {status}.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    // backgroundColor: '#F9F9F9',
    // borderRadius: 10,
    // height: 58,
    // elevation: 8,
    // shadowColor: 'black',
  },
  statusText: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2F2C',
  },
});

export default CustomStatusBar;
