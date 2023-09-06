/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, createRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

// Firebase
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';

// Constants
import Font from '../constants/Font';
import Colors from '../constants/Colors';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Screen';

// Context
import { useContext } from 'react';
import { UserDataContext } from '../contexts/UserDataContext';

function PhoneLoginOTP({ navigation, route }: NativeStackScreenProps<RootStackParamList, "PhoneVerify">) {
  // context var
  const userData = useContext(UserDataContext);
  const { setDriverData, setVehicleData } = userData;

  const [otp, setOtp] = useState<string>('');
  const textInputRef = createRef<TextInput>();
  const confirmOTP = useRef<FBAuth.ConfirmationResult>();

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

  async function getDriverInfo(driverPhone: string, setDriverData: any) {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/drivers/${driverPhone}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error('Server returned an error (getting driver info): ', responseData);
        return null;
      }

      const responseData = await response.json();
      // console.log('Getting driver info successful:', responseData);

      await setDriverData(responseData);

      return responseData;
    } catch (error) {
      console.error('Error during getting driver info:', error);
      return null;
    }
  }

  async function getVehicleInfo(driverId: string, setVehicleData: any) {
    try {
      const apiUrl = `http://10.0.2.2:3000/api/vehicles/${driverId}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error('Server returned an error (getting vehicle info): ', responseData);
        return null;
      }

      const responseData = await response.json();
      // console.log('Getting vehicle info successful:', responseData);

      await setVehicleData(responseData);

      return responseData;
    } catch (error) {
      console.error('Error during getting vehicle info:', error);
      return null;
    }
  }

  async function login() {
    await signInWithPhoneNumber();
    const driverPhone = route.params.phone;
    const driverDataReponse = await getDriverInfo(driverPhone, setDriverData);
    await getVehicleInfo(driverDataReponse.id, setVehicleData);

    // const vehicleDataResponse = await getVehicleInfo(driverDataResponse.id);

    // console.log('Before setting driver data:', setDriverData);

    // console.log('After setting driver data:', setDriverData);

    // console.log('Before setting vehicle data:', setVehicleData);
    // console.log('After setting vehicle data:', setVehicleData);

    // console.log("Login Driver Id: ", driverDataResponse.id);
    // console.log("Driver Context Data: ", driverData);
    // console.log("Vehicle Context Data: ", vehicleData);
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
        <Text style={styles.resendText}> Get new code in 01:28 </Text>
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
