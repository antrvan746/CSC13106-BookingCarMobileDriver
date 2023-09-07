/* eslint-disable prettier/prettier */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavLoginNames, LoginStackParam } from "./Login"
import { RideReq } from '../services/DriverWaitXHR';

// Screen name: take appropriate decision to use navigate to navigate between screens or only change component content
export type NavScreenNames = 'Register' | 'Login' | 'Main' | 'Profile' | 'Driving' | 'Payment' | 'CongratsPayment' | NavLoginNames;
interface StackScreenProps
  extends NativeStackScreenProps<RootStackParamList, NavScreenNames> { }

export type RootStackParamList = {
  Welcome: undefined;
  SelectLoginMethod: undefined;
  Login: {
    screen?: string,
    params?: any
  };
  Register: undefined;
  Main: undefined;
  Profile: undefined;
  Driving: { trip_data: RideReq };
  Payment: { paymentId: string };
  CongratsPayment: { paymentId: string };
} & LoginStackParam;
