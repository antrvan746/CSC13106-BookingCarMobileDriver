/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const UserAvatar = () => {
  const handlePress = () => {
    // Handle button press
  };

  return (
    <View>
      <Image
        source={require('../assets/icons/default_user.png')} // Replace with your image path
        style={styles.userImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    marginRight: 20,
    height: 36,
    width: 36,
  },
});

export default UserAvatar;
