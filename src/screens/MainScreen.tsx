/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Revenue from '../components/Revenue';
import Layer from '../components/Layer';
import StatusBar from '../components/StatusBar';
import StatusButton from '../components/StatusButton';
import UserAvatar from '../components/UserAvatar';
import NavigationBar from '../components/NavigationBar';

const MainScreen = () => {
  const [status, setStatus] = useState('offline');

  const handlePress = () => {
    setStatus(status === 'online' ? 'offline' : 'online');
  };

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.firstWrapper}>
        <Revenue />
        <UserAvatar />
      </View>

      <View style={styles.secondWrapper}>
        <View style={styles.buttonWrapper}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <StatusButton handlePress={handlePress} />
          </View>
          <Layer />
        </View>
        <View style={styles.statusBarWrapper}>
          <StatusBar status={status} />
          <View style={{marginBottom: 5, marginTop: 5}}></View>
          <NavigationBar />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    position: 'relative',
  },
  firstWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  secondWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',

    flexDirection: 'column',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 10,
    paddingRight: 20,
  },
  statusBarWrapper: {
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default MainScreen;
