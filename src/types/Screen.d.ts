/* eslint-disable prettier/prettier */
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Screen name: take appropriate decision to use navigate to navigate between screens or only change component content
export type NavScreenNames = 'Login' | 'Main' | 'Driving' | 'Payment' | 'CongratsPayment';
interface StackScreenProps
  extends NativeStackScreenProps<RootStackParamList, NavScreenNames> {}

export type RootStackParamList = {
  Login: StackScreenProps;
  Main: ScreenWrapperProps;
  Driving: ScreenWrapperProps;
  Payment: ScreenWrapperProps;
};
