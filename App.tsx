/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import { RootStackParamList } from './src/types/Screen';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import DrivingScreen from './src/screens/DrivingScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import PaymentCongratsScreen from './src/screens/PaymentCongratsScreen';
import { Provider } from 'react-redux';
import ReduxStore from './src/redux/store';

export type RootStackParamList = {
  Login: { accountPhoneNumber: string };
  Main: undefined;
  Driving: { tripId: string };
  Payment: { paymentId: string };
  CongratsPayment: { paymentId: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={ReduxStore}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}>

          <Stack.Screen
            name="Login"
            component={LoginScreen} />

          <Stack.Screen
            name="Main"
            component={MainScreen} />

          <Stack.Screen
            name="Driving"
            component={DrivingScreen} />

          <Stack.Screen
            name="Payment"
            component={PaymentScreen} />

          <Stack.Screen
            name="CongratsPayment"
            component={PaymentCongratsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
});

export default App;
