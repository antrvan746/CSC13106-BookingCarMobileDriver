/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

} from 'react-native';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import Icon from 'react-native-ionicons';
import AppTextInput from '../components/AppTextInput';

import React, { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;


// Redux
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectMainScreenState, setMainScreenState } from '../redux/MainScreen';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }: LoginScreenProps) => {
  const [confirm, setConfirm] = useState<FBAuth.ConfirmationResult | null>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // const mainScreenState = useAppSelector(selectMainScreenState);

  // const dispatch = useAppDispatch();

  const handleSigninButton = () => {
    // dispatch(setMainScreenState({
    //   state: mainScreenState.state === 'Available' ? 'Available' : 'Unavailable',
    // }));
    navigation.navigate('Main');
  };

  const handleSendOtpButton = () => {
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
      await confirm.confirm('123456');

    } catch (error) {
      console.log('Invalid code.');
    }
  }

  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('+1 123-455-6789')}
  //     />
  //   );
  // }

  return (
    <SafeAreaView>
      <View style={styles.containerWrapper}>
        <View style={{
          alignItems: 'center',
        }} >
          <Text style={styles.titleText} >
            Login here
          </Text>
          <Text style={styles.titleSubtext}>
            Welcome back you've been missed!
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <AppTextInput placeholder="Phone number" />
          <TouchableOpacity
            onPress={handleSendOtpButton}
            style={styles.sendOtpButton}>
            <Text style={styles.sendOtpText}>
              Send OTP Code
            </Text>
          </TouchableOpacity>
          <AppTextInput placeholder="OTP Code" />
        </View>

        <View>
          <Text style={styles.forgotPwText}>
            Forgot your password ?
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSigninButton}
          style={styles.signInButton}>
          <Text style={styles.signInText}>
            Sign in
          </Text>
        </TouchableOpacity>
        {/* TODO: Create Register Screen */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Welcome')}
          style={styles.createNewAccButton}>
          <Text style={styles.createNewAccText}>
            Create new account
          </Text>
        </TouchableOpacity>

        <View style={styles.otherOptionsWrapper}>
          <Text style={styles.continueText}>
            Or continue with
          </Text>

          <View style={styles.otherIconsWrapper}>
            <TouchableOpacity style={styles.iconTouchable}>
              <Icon
                name="logo-google"
                color={Colors.brown}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchable}>
              <Icon
                name="logo-apple"
                color={Colors.brown}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouchable}>
              <Icon
                name="logo-facebook"
                color={Colors.brown}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerWrapper: {
    padding: Spacing * 2,
  },
  titleText: {
    fontSize: FontSize.xLarge,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: Font['poppins-bold'],
    marginVertical: Spacing * 3,
  },
  titleSubtext: {
    fontFamily: Font['poppins-semiBold'],
    fontSize: FontSize.large,
    maxWidth: '60%',
    textAlign: 'center',
  },
  inputWrapper: {
    marginVertical: Spacing * 3,
  },
  forgotPwText: {
    fontFamily: Font['poppins-semiBold'],
    fontSize: FontSize.small,
    color: Colors.primary,
    alignSelf: 'flex-end',
  },
  signInButton: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  signInText: {
    fontFamily: Font['poppins-bold'],
    color: Colors.white,
    textAlign: 'center',
    fontSize: FontSize.large,
    fontWeight: '700',
  },
  createNewAccButton: {
    padding: Spacing,
  },
  createNewAccText: {
    fontFamily: Font['poppins-semiBold'],
    color: Colors.text,
    textAlign: 'center',
    fontSize: FontSize.medium,
  },
  otherOptionsWrapper: {
    marginVertical: Spacing * 3,
  },
  otherIconsWrapper: {
    marginTop: Spacing,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  continueText: {
    fontFamily: Font['poppins-semiBold'],
    color: Colors.primary,
    textAlign: 'center',
    fontSize: FontSize.small,
  },
  iconTouchable: {
    padding: Spacing,
    backgroundColor: Colors.darkWhite,
    borderRadius: Spacing / 2,
    marginHorizontal: Spacing,
  },
  sendOtpButton: {
    marginHorizontal: 60,
    width: Spacing * 25,
    padding: Spacing * 1.2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 0.5,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  sendOtpText: {
    fontFamily: Font['poppins-bold'],
    color: Colors.white,
    textAlign: 'center',
    fontSize: FontSize.medium,
    fontWeight: '700',
  }
});