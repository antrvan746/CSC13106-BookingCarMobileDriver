/* eslint-disable prettier/prettier */
import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { useUserData } from '../contexts/UserDataContext';

function TripInfor(): JSX.Element {
  const { tripData } = useUserData();


  function formatPrice(price: number) {

    // Format the price with decimal places and add "đ" at the end
    const formattedPrice = price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedPrice;
  }


  return (
    <View style={styles.tripInforWrapper}>
      <View>
        <Text style={styles.riderName}>{tripData?.user_name}</Text>
      </View>
      <View style={styles.location}>
        {/* <Text style={styles.destination}>Nhà hàng Hàn Quốc Hana</Text> */}
        <Text style={styles.address}>
          {tripData?.eadr}
        </Text>
      </View>
      <View>
        <Text style={styles.price}>{formatPrice((tripData?.price || 0) * 1000)}</Text>
      </View>
    </View>
  );
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
    marginTop: 5,
  },
});

export default TripInfor;
