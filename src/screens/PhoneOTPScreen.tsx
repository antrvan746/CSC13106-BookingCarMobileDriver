/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, createRef, useEffect } from 'react';
import { LoginStackSreenProps } from '../types/Login';
import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Font from '../constants/Font';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';



function PhoneLoginOTP({ navigation, route }: LoginStackSreenProps) {
  const [otp, setOtp] = useState<string>('');
  const textInputRef = createRef<TextInput>();

  function onClickOTP() {
    console.log('Click OTP');
    textInputRef.current?.blur();

    textInputRef.current?.focus();
  }



  async function signInWithPhoneNumber() {
    if (route.params?.phone) {
      console.log('Login', route.params.phone);
      const confirmation = await auth().signInWithPhoneNumber(route.params.phone);
      confirmation.confirm(otp);
    }
  }
  async function signOutWithPhoneNumber() {
    if (route.params?.phone) {
      const confirmation = await auth().signOut();
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
      onPress={signInWithPhoneNumber} >
      <View style={styles.nextButton}>
        <Text style={styles.buttonText}> CONFIRM </Text>
      </View>
    </TouchableHighlight>

    <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD"
      style={{ backgroundColor: 'black' }}
      onPress={signOutWithPhoneNumber} >
      <View style={styles.nextButton}>
        <Text style={styles.buttonText}> MAGICAL LOGOUT </Text>
      </View>
    </TouchableHighlight>

    <Text style={styles.titleText}>Didn't receive it?</Text>
    <TouchableHighlight
      style={styles.resendButton}
      onPress={signOutWithPhoneNumber} >
      <View>
        <Text style={styles.resendText}> Get new code or send by ABC in 00:28 </Text>
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
  // nextButton: {
  //   padding: 12,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
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
