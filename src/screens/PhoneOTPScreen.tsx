/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, createRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

// API
import { getDriverInfo, getVehicleInfo } from '../api/api';

// Firebase
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';

// Constants
import Font from '../constants/Font';
import Colors from '../constants/Colors';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Screen';

// Context
import { useUserData } from '../contexts/UserDataContext';

function PhoneLoginOTP({ navigation, route }: NativeStackScreenProps<RootStackParamList, "PhoneVerify">) {
  // context var
  const { setDriverData, setVehicleData } = useUserData();
  const [otp, setOtp] = useState<string>('');
  const textInputRef = createRef<TextInput>();
  const confirmOTP = useRef<FBAuth.ConfirmationResult>();

  const [timeLeft, setTimeLeft] = useState(90);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  function onClickOTP() {
    textInputRef.current?.blur();
    textInputRef.current?.focus();
  }

  useEffect(() => {
    auth().signInWithPhoneNumber(route.params.phone).then(v => confirmOTP.current = v);
  }, [])

  async function signInWithPhoneNumber() {
    if (confirmOTP) {
      try {
        const res = await confirmOTP.current?.confirm(otp);
        navigation.replace("Main");
      } catch (e) {
        console.error(e);
      }
    }
  }
  async function signOutWithPhoneNumber() {
    if (route.params?.phone) {
      const confirmation = await auth().signOut();
    }
  }

  async function login() {
    await signInWithPhoneNumber();
    const driverPhone = route.params.phone;
    const driverDataResponse = await getDriverInfo(driverPhone);
    if (!driverDataResponse) {
      return;
    }
    const vehicleData = await getVehicleInfo(driverDataResponse.id);

    if (vehicleData) {
      setDriverData?.(driverDataResponse);
      setVehicleData?.(vehicleData);
    }
  }

  return (<View style={styles.screenContainer}>
    <Text style={styles.titleText}>Enter the 6-digit code sent to {route.params?.phone} by SMS</Text>
    <Pressable style={styles.otpContainer} onPress={onClickOTP}>
      {
        [0, 1, 2, 3, 4, 5].map((num, index) => <View
          key={index}
          style={styles.otpNumberContainer}>
          <Text>{num < otp.length ? otp[num] : '  '}</Text>
        </View>)
      }
    </Pressable>
    <TextInput
      autoFocus
      onChangeText={(t) => setOtp(t)}
      maxLength={6}
      style={{ width: 0, height: 0, padding: 0 }}
      ref={textInputRef}
      keyboardType="number-pad" />

    <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD"
      style={styles.nextButtonWrapper}
      onPress={login} >
      <View style={styles.nextButton}>
        <Text style={styles.buttonText}> CONFIRM </Text>
      </View>
    </TouchableHighlight>

    <Text style={styles.titleText}>Didn't receive it?</Text>
    <TouchableHighlight
      style={styles.resendButton}
      onPress={signOutWithPhoneNumber} >
      <View>
        <Text style={styles.resendText}> Get new code in {formattedTime} </Text>
      </View>
    </TouchableHighlight>
  </View>);
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  nextButtonWrapper: {
    backgroundColor: Colors.primary,
    height: 60,
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    borderRadius: 50,
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  otpContainer: {
    marginTop: 42,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  otpNumberContainer: {
    borderEndColor: 'black',
    borderWidth: 1,
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 6,
  },
  otpNumber: {
    color: 'red',
    fontSize: 16,
  },
  titleText: {
    paddingHorizontal: 28,
    marginTop: 24,
    fontSize: 18,
    fontFamily: Font['poppins-bold'],
  },
  resendButton: {
    backgroundColor: 'transparent',
  },
  resendText: {
    fontSize: 16,
    color: Colors.darkText,
    opacity: 0.6,
    paddingHorizontal: 24,
  }
});

export default PhoneLoginOTP;
