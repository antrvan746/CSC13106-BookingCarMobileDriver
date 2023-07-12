/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native';
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';

import MainScreen from './MainScreen';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectMainScreenState, setMainScreenState } from '../redux/MainScreen';
import { selectDrivingScreenState, setDrivingScreenState } from '../redux/DrivingScreen';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<FBAuth.ConfirmationResult | null>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  const mainScreenState = useAppSelector(selectMainScreenState);

  const dispatch = useAppDispatch();

  const handleScreenChange = () => {
    dispatch(setMainScreenState({
      state: mainScreenState.state === 'Available' ? 'Available' : 'Unavailable',
    }));
    navigation.navigate('Main');
  };

  // Handle login
  const onAuthStateChanged: FBAuth.AuthListenerCallback = function (user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
      console.log('Logged in', user.phoneNumber);
    } else {
      console.log('Logging in');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    if (!confirm) {
      return;
    }
    try {
      await confirm.confirm('222222');

    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+1 222-222-2222')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
      <Button title="Change state" onPress={handleScreenChange} />
    </>
  );
}

export default LoginScreen;