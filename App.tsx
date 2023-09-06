/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
// import LoginScreen from './src/screens/LoginScreen.old';
// import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import DrivingScreen from './src/screens/DrivingScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import PaymentCongratsScreen from './src/screens/PaymentCongratsScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OtpScreen from './src/screens/OtpScreen';
import LoginScreen from './src/screens/LoginSelectScreen';

// Redux
import { Provider } from 'react-redux';
import ReduxStore from './src/redux/store';
import { selectLoginState } from './src/redux/LoginState';
import { DriverInfo } from './src/services/RideWs';
import { RideReq } from './src/services/DriverWaitXHR';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { UserDataProvider } from './src//contexts/UserDataContext';
import { RootStackParamList } from './src/types/Screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <UserDataProvider>
      <Provider store={ReduxStore}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}>

            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen} />

            <Stack.Screen
              name="Login"
              component={LoginScreen} />

            <Stack.Screen
              name="Register"
              component={RegisterScreen} />

            <Stack.Screen
              name="Main"
              component={MainScreen} />

            <Stack.Screen
              name="Profile"
              component={ProfileScreen} />

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
    </UserDataProvider>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
});

export default App;
