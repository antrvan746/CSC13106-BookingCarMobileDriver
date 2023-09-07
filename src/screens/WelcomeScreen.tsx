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
import React, { useEffect } from 'react';

// Constants
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
const { height } = Dimensions.get('window');

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Screen';
type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

// Context
import { DriverData, VehicleData, useUserData } from '../contexts/UserDataContext';

// Firebase
import auth from '@react-native-firebase/auth';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation: { navigate } }) => {
  const { setDriverData, setVehicleData } = useUserData();

  useEffect(() => {
    const user = auth().currentUser;
    console.log(user);
    if (user && user.phoneNumber) {

      getData(user.phoneNumber).then((success) => {
        if (success) {
          navigate("Main");
        }
      });
    }
  }, [])


  async function getData(phone: string) {
    const driverData = await getDriverInfo(phone);
    if (!driverData) {
      return false;
    }
    const vehicleData = await getVehicleInfo(driverData.id)
    if (!vehicleData) {
      return false;
    }

    setDriverData(driverData);
    setVehicleData(vehicleData);

    return true;
  }

  async function getDriverInfo(driverPhone: string) {
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

      return responseData as DriverData;
    } catch (error) {
      console.error('Error during getting driver info:', error);
      return null;
    }
  }

  async function getVehicleInfo(driverId: string) {
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

      return responseData as VehicleData;
    } catch (error) {
      console.error('Error during getting vehicle info:', error);
      return null;
    }
  }

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
            Welcome, CallCab Drivers!
          </Text>

          <Text style={styles.titleSubtext} >
            Unlock New Opportunities, Drive with CallCab!
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => navigate('Login', {})}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>
              Sign in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Register')}
            style={styles.registerButton} >
            <Text style={styles.registerButtonText} >
              Sign up
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
  loading: {

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