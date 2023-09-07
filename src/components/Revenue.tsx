/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const Revenue = () => {
  const handlePress = () => {
    // Handle button press
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.revenueButton,
          { backgroundColor: pressed ? '#F9F9F9' : '#F9F9F9' },
        ]}>
        {({ pressed }) => (
          <View style={styles.revenueWrapper}>
            <Icon name="bar-chart-2" color={'#2F2F2C'} size={24} />
            <Text
              style={[
                styles.buttonText,
                { color: pressed ? '#2F2F2C' : '#2F2F2C' },
              ]}>
              Thu nhập
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  revenueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: 'black',
  },
  revenueTxt: {
    color: 'red',
    fontSize: 30,
  },
  revenueButton: {
    backgroundColor: '#2F2C2C',
    borderRadius: 50,
    alignItems: 'center',
    height: 46,
    width: 130,
    marginLeft: 20,
    justifyContent: 'center',
    elevation: 8,
    shadowColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 3,
  },
});

export default Revenue;
