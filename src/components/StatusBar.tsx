/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface StatusTextProps {
  status: string;
}

const StatusBar: React.FC<StatusTextProps> = ({status}) => {
  const iconColor = status === 'online' ? '#13B45D' : '#E50101';
  return (
    <View style={styles.statusView}>
      <Icon name="circle" color={iconColor} size={16} />
      <Text style={styles.statusText}>
        Bạn đang {status === 'online' ? 'online' : 'offline'}.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    height: 58,
    elevation: 8,
    shadowColor: 'black',
  },
  statusText: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2F2C',
  },
});

export default StatusBar;
