/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackScreenProps } from '../types/Screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackParam, LoginStackSreenProps } from '../types/Login';
import PhoneLogin from './PhoneLoginScreen';
import PhoneLoginOTP from './PhoneOTPScreen';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectLoginState, setLoginState } from '../redux/LoginState';
import auth, { FirebaseAuthTypes as FBAuth } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Colors from '../constants/Colors';
import { Dimensions } from 'react-native';
import Font from '../constants/Font';
const { height } = Dimensions.get('window');


const NavStack = createNativeStackNavigator<LoginStackParam>();

function GoogleLoginButton() {
  const dispatch = useAppDispatch();
  const onAuthStateChange: FBAuth.AuthListenerCallback = async function (userData) {
    //console.log(userData);
    if (!userData) {
      dispatch(setLoginState({ user: null }));
      return;
    }
    console.log('Login success');
    const { email, phoneNumber, photoURL, providerId, uid, displayName } = userData;
    console.log('Getting location key');
    const locationIQKey = (await database().ref('/LocationIQ_KEY').once('value')).val();
    if (locationIQKey) {
      console.log('Login with locationIQ key', locationIQKey);

      dispatch(setLoginState({
        user: { email, phoneNumber, photoURL, providerId, uid, displayName, locationIQKey },
      }));

    } else {
      console.log('Cant get location IQ key', locationIQKey);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function GoogleLoginPress() {
    try {
      await GoogleSignin.configure({
        webClientId: '352689544618-38jhvc2keshgmssvulcv6cke3v8hun6l.apps.googleusercontent.com',
      });

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const result = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
      return (await auth().signInWithCredential(googleCredential));
    } catch (e) {
      console.log('Login error', JSON.stringify(e));
    }
  }

  return (<TouchableHighlight activeOpacity={0.6} underlayColor="#13B45D" style={{ borderRadius: 50 }}
    onPress={GoogleLoginPress} >
    <View style={styles.selectLoginWrapper}>
      <Icon name="mail" size={24} color={Colors.gray} />
      <Text style={styles.selectLoginText}>Login with Google</Text>
    </View>
  </TouchableHighlight>);
}

function LoginSelectScreen({ navigation, route }: LoginStackSreenProps) {
  function selectLoginWithPhone() {
    navigation.navigate('Phone');
  }

  const loginState = useAppSelector(selectLoginState);

  function logout() {
    auth().signOut();
  }

  return (<View style={styles.screenContainer}>
    <View style={[styles.loginComponentContainer]}>

      {
        !auth().currentUser ? null :
          <TouchableHighlight activeOpacity={0.6} underlayColor="#13B45D" style={{ borderRadius: 12, marginBottom: 20 }}
            onPress={logout} >
            <View style={styles.selectLoginWrapper}>
              <Text style={styles.selectLoginText}>Logout</Text>
            </View>
          </TouchableHighlight>
      }
      <ImageBackground
        style={{
          height: height / 2.5,
          marginBottom: 160,

        }}
        resizeMode="contain"
        source={require('../assets/images/welcome_img.png')} />

      <GoogleLoginButton />

      <TouchableHighlight activeOpacity={0.6} underlayColor="#13B45D" style={{ borderRadius: 12, marginTop: 20 }}
        onPress={selectLoginWithPhone} >
        <View style={styles.selectLoginWrapper}>
          <Icon name="call" size={24} color={Colors.gray} />
          <Text style={styles.selectLoginText}>Login with Phone</Text>
        </View>
      </TouchableHighlight>

    </View>
  </View>);
}

function LoginScreen({ navigation, route }: StackScreenProps) {
  function onSuccessLogin() {
    console.log('Navigate to desire screen');
    navigation.replace('Main');
    //navigation.replace("Main");
  }

  return (
    <NavStack.Navigator initialRouteName="Select">
      <NavStack.Screen options={{ headerShown: false }} name="Select">
        {
          (props) => <LoginSelectScreen {...props} />
        }
      </NavStack.Screen>

      <NavStack.Screen name="Phone">
        {
          (props) => <PhoneLogin {...props} />
        }
      </NavStack.Screen>
      <NavStack.Screen name="PhoneVerify">
        {
          (props) => <PhoneLoginOTP {...props} onSuccess={onSuccessLogin} />
        }
      </NavStack.Screen>
    </NavStack.Navigator>);
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  loginComponentContainer: {
    position: 'absolute',
    bottom: 70,
    left: 40,
    right: 40,
  },
  selectLoginWrapper: {
    backgroundColor: Colors.lightWhite,
    paddingVertical: 12,
    height: 60,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectLoginText: {
    textAlign: 'center',
    color: Colors.text,
    fontFamily: Font['poppins-bold'],
    fontSize: 18,
    fontWeight: 700,
    marginLeft: 12,
  },

});

export default LoginScreen;
