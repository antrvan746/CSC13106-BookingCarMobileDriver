/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
const { height } = Dimensions.get('window');

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View
        style={styles.containerWrapper}>
        <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require('../assets/images/welcome_img.png')} />
        <View
          style={styles.titleWraper}>
          <Text style={styles.titleText}>
            Discover Your Dream Job here
          </Text>

          <Text style={styles.titleSubtext} >
            Explore all the existing job roles based or your interest and study
            major
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => navigate('Login')}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Register')}
            style={styles.registerButton} >
            <Text style={styles.registerButtonText} >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: Colors.white,
    height: '100%',
  },
  titleWraper: {
    paddingHorizontal: Spacing * 4,
    paddingTop: Spacing * 5,
  },
  titleText: {
    fontSize: FontSize.xxLarge,
    color: Colors.green,
    fontFamily: Font['poppins-bold'],
    fontWeight: '700',
    textAlign: 'center',
  },
  titleSubtext: {
    fontSize: FontSize.small,
    color: Colors.text,
    fontFamily: Font['poppins-regular'],
    textAlign: 'center',
    marginTop: Spacing * 2,
  },
  buttonWrapper: {
    paddingHorizontal: Spacing * 2,
    paddingTop: Spacing * 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: Colors.green,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: '40%',
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    marginRight: Spacing,
  },
  registerButton: {
    backgroundColor: Colors.lightWhite,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: '40%',
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    marginLeft: Spacing,
  },
  loginButtonText: {
    fontFamily: Font['poppins-bold'],
    color: Colors.white,
    fontSize: FontSize.large,
    fontWeight: '700',
    textAlign: 'center',
  },
  registerButtonText: {
    fontFamily: Font['poppins-bold'],
    color: Colors.text,
    fontSize: FontSize.large,
    fontWeight: '700',
    textAlign: 'center',
  },
});