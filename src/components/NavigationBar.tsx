/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavigationBar = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    // Handle button press
  };

  const handleAutoAcceptPress = () => {
    setIsPressed(prevState => !prevState);
  };
  const statusColor = isPressed ? '#13B45D' : '#2F2F2C';

  return (
    <View style={styles.navigationView}>
      <View style={styles.services}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.logo_center}>
            <View style={styles.icon}>
              <Icon name="local-taxi" color={'#2F2F2C'} size={18} />
            </View>
            <Text style={styles.text}>Loại dịch vụ</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.location}>
        <TouchableOpacity onPress={handlePress} style={styles.servicesButton}>
          <View style={styles.logo_center}>
            <View style={styles.icon}>
              <Icon name="location-on" color={'#2F2F2C'} size={18} />
            </View>
            <Text style={styles.text} numberOfLines={2}>
              Điểm đến yêu thích
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.autoAccept}>
        <TouchableOpacity
          onPress={handleAutoAcceptPress}
          style={styles.servicesButton}>
          <View style={styles.logo_center}>
            <View style={styles.icon}>
              <Icon name="bolt" color={statusColor} size={18} />
            </View>
            <Text style={[styles.text, {color: '#2F2F2C'}]} numberOfLines={2}>
              Tự động nhận
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.money}>
        <TouchableOpacity onPress={handlePress} style={styles.servicesButton}>
          <View style={styles.logo_center}>
            <View style={styles.icon}>
              <Icon name="business-center" color={'#2F2F2C'} size={18} />
            </View>
            <Text style={styles.text} numberOfLines={2}>
              Tiền vốn hoạt động
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.more}>
        <TouchableOpacity onPress={handlePress} style={styles.servicesButton}>
          <View style={styles.logo_center}>
            <View style={styles.icon}>
              <Icon name="more-horiz" color={'#2F2F2C'} size={18} />
            </View>
            <Text style={styles.text}>Xem thêm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    height: 84,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: 'black',
  },
  services: {
    alignItems: 'center',
    paddingTop: 10,
    width: 80,
  },
  servicesButton: {},

  serviceText: {},
  location: {
    alignItems: 'center',
    paddingTop: 10,
    width: 80,
  },
  autoAccept: {
    alignItems: 'center',
    paddingTop: 10,
    width: 80,
  },
  money: {
    alignItems: 'center',
    paddingTop: 10,
    width: 80,
  },
  more: {
    alignItems: 'center',
    paddingTop: 10,
  },
  text: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#2F2F2C',
  },
  logo_center: {
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#E4E4E4',
    borderRadius: 20,
    padding: 5,
  },
});

export default NavigationBar;
