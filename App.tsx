import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MainScreen from './src/screens/MainScreen';

function App() {
  return (
    <SafeAreaView style={styles.containerWrapper}>
      <MainScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
});

export default App;
