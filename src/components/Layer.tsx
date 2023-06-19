/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Layer = () => {
  const handlePress = () => {
    // Handle button press
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.layerImage}>
      <Icon name="layers" color={'#2F2F2C'} size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  layerImage: {
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    padding: 2,
    elevation: 8,
    shadowColor: 'black',
  },
});

export default Layer;
