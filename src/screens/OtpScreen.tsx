/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, createRef, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type OtpScreenProps = NativeStackScreenProps<RootStackParamList, 'Otp'>;

interface PhoneOTPProps extends OtpScreenProps {
  onSuccess: () => void;
}

const OtpScreen = ({ navigation, route }: PhoneOTPProps) => {
  const [otp, setOtp] = useState<string>('');
  const textInputRef = createRef<TextInput>();

  const onSuccess = () => {
    // Perform any actions needed on successful login
    // For example, navigate to a different screen
    navigation.navigate('Main');
  };

  function onClickOTP() {
    console.log('Click OTP');
    textInputRef.current?.blur();

    textInputRef.current?.focus();
  }

  const onAuthStateChanged: FBAuth.AuthListenerCallback = function (user) {
    console.log(user ? `Login successfully ${user.phoneNumber}` : 'Log out success fully');
    //dispatch(setLoginState({ user }));
    if (user) {
      //onSuccess();
    }
  };

  async function signInWithPhoneNumber() {
    // if (route.params?.phoneNumber) {
    //   console.log('Login', route.params.phoneNumber);
    //   const confirmation = await auth().signInWithPhoneNumber(route.params.phoneNumber);
    //   confirmation.confirm(otp);
    // }
    navigation.navigate('Welcome');
  }
  async function signOutWithPhoneNumber() {
    if (route.params?.phoneNumber) {
      const confirmation = await auth().signOut();
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (<View style={styles.screenContainer}>
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

  </View>);
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  nextButtonWrapper: {
    backgroundColor: '#13B45D', //GlobalStyles.green500.color,
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 24,
  },
  nextButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
    color: 'black',
    fontSize: 16,
  },
});

export default OtpScreen;
