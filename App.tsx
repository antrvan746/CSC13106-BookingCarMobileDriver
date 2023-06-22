/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MainScreen from './src/screens/MainScreen';
import DrivingScreen from './src/screens/DrivingScreen';
import PaymentFirstScreen from './src/screens/PaymentFirstScreen';
import PaymentSecondScreen from './src/screens/PaymentSecondScreen';
function App() {
  return (
    <SafeAreaView style={styles.containerWrapper}>
      {/* <MainScreen /> */}
      {/* <DrivingScreen /> */}
      {/* <PaymentFirstScreen /> */}
      <PaymentSecondScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
});

export default App;
