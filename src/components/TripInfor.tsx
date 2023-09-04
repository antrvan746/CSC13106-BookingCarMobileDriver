/* eslint-disable prettier/prettier */
import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';

function TripInfor(): JSX.Element {
  const tripData = {
    name: "Testing client",
    destination: "56/2 Dien Bien Phu, Phuong 26, Quan Binh Thanh",
    price: "125000",
  }

  function formatPrice(price: string) {
    // Convert the price to a number
    const numericPrice = parseFloat(price);

    // Check if the price is a valid number
    if (isNaN(numericPrice)) {
      return "Invalid Price";
    }

    // Format the price with decimal places and add "đ" at the end
    const formattedPrice = numericPrice.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedPrice;
  }

  const price = formatPrice(tripData.price)

  return (
    <View style={styles.tripInforWrapper}>
      <View>
        <Text style={styles.riderName}>{tripData.name}</Text>
      </View>
      <View style={styles.location}>
        {/* <Text style={styles.destination}>Nhà hàng Hàn Quốc Hana</Text> */}
        <Text style={styles.address}>
          {tripData.destination}
        </Text>
      </View>
      <View>
        <Text style={styles.price}>{price}</Text>
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
