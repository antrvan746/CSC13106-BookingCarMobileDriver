import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, } from "react-native";
import React from "react";

// Constants
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { WINDOW_WIDTH } from '../constants/Dimenstions';

// Navigation
import { RootStackParamList } from "../types/Screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

// Firebase
import auth from '@react-native-firebase/auth';

// Context
import { useUserData } from '../contexts/UserDataContext';

function ProfileScreen({ navigation, route }: ProfileScreenProps) {
  const { driverData, vehicleData, clearUserData } = useUserData();

  if (!driverData || !vehicleData) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={50} color={Colors.primary} />
        <Text style={{ alignSelf: "center", fontFamily: Font["poppins-bold"], fontSize: 20 }}>Loading profile data...</Text>
      </View>
    );
  }

  function backToMain() {
    navigation.navigate("Main");
  }

  function signOut() {
    clearUserData();
    auth().signOut();
    navigation.replace("Welcome");
  }

  return (
    <View style={styles.container} >
      <View style={styles.navigationContainer} >
        <TouchableOpacity onPress={backToMain} style={styles.backIcon}>
          <Image
            source={require('../assets/icons/left_arrow_png.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}> Profile </Text>
        <View></View>
      </View>
      <View
        style={{
          position: "relative",
          marginVertical: Spacing * 3,
          marginBottom: 100,
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: Font["poppins-bold"], color: Colors.green, opacity: 0.7 }}>Driver Information</Text>
        <Text style={styles.label}>Driver id: {driverData?.id}</Text>
        <Text style={styles.label}>Full name: {driverData?.name}</Text>
        <Text style={styles.label}>Phone number: {driverData?.phone}</Text>
        <Text style={styles.label}>Email: {driverData?.email}</Text>

        <Text style={{ marginTop: 15, fontFamily: Font["poppins-bold"], fontSize: 20, color: Colors.green, opacity: 0.7 }}>Vehicle Information</Text>
        <Text style={styles.label}>Vehicle id: {vehicleData?.id}</Text>
        <Text style={styles.label}>Plate number:{vehicleData?.plate_number}</Text>
        <Text style={styles.label}>Model: {vehicleData?.model}</Text>
        <Text style={styles.label}>Model: {vehicleData?.color}</Text>
        <Text style={styles.label}>Type: {vehicleData?.type}</Text>
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity onPress={signOut}>
          <View style={styles.signOutBtn}>
            <Text style={[styles.signOutText]}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing * 2,
    position: "relative",
  },
  loading: {
    // paddingVertical: 300,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    width: 10,
    height: 21,
  },
  label: {
    paddingVertical: 5,
  },
  seperateLine: {
    width: WINDOW_WIDTH - 20,
    height: 2,
    marginVertical: 10,
    marginRight: 8,
    backgroundColor: '#d3d3d3',
    opacity: 0.6,
    borderRadius: 10,
  },
  title: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: Font["poppins-bold"],
    marginVertical: Spacing * 1.2,
  },
  registerButton: {
    position: "absolute",
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
    bottom: 0,
    left: 0,
    right: 0,
  },
  registerButtonText: {
    fontFamily: Font['poppins-bold'],
    color: Colors.white,
    fontSize: FontSize.large,
    fontWeight: '700',
    textAlign: 'center',
  },
  signOutContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b23b3b',
    elevation: 8,
    shadowColor: 'black',
    width: 330,
    height: 60,
    borderRadius: 10,
    bottom: 0,
  },
  signOutText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  }
});