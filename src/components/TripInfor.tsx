/* eslint-disable prettier/prettier */
import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class TripInfor extends Component {
  render() {
    return (
      <View style={styles.tripInforWrapper}>
        <View>
          <Text style={styles.riderName}>Nguyễn Ngọc Anh Thư</Text>
        </View>
        <View style={styles.location}>
          <Text style={styles.destination}>Nhà hàng Hàn Quốc Hana</Text>
          <Text style={styles.address}>
            05, Khu Phố Nam Sài Gòn Residences Nguyễn Hữu Thọ, Xã Phước Kiến,...
          </Text>
        </View>
        <View>
          <Text style={styles.price}>125.000đ</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tripInforWrapper: {
    flexDirection: 'column',
  },
  riderName: {
    color: '#2F2C2C',
    fontSize: 15,
    fontWeight: '400',
  },
  location: {
    width: 230,
    color: '#2F2C2C',
    fontSize: 15,
  },
  destination: {
    fontWeight: '700',
    color: '#2F2C2C',
    fontSize: 15,
  },
  address: {
    color: '#2F2C2C',
    fontSize: 15,
  },
  price: {
    color: '#2F2C2C',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default TripInfor;
