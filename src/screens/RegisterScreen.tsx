import { StyleSheet, Text, TouchableOpacity, View, ScrollView, } from "react-native";
import React, { useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import { SelectList } from 'react-native-dropdown-select-list'

// API
import { createDriver, createVehicle } from "../api/api";

// Contants
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { WINDOW_WIDTH } from '../constants/Dimenstions';

// Components
import AppTextInput from "../components/AppTextInput";

// Navigation
import { StackScreenProps } from '../types/Screen';

function RegisterScreen({ navigation, route }: StackScreenProps) {
  const [vehicleSelected, setvehicleSelected] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");

  const vehicles = [
    { key: 'motorbike', value: 'Motorbike' },
    { key: '4-seats', value: 'Car 4 seats' },
    { key: '7-seats', value: 'Car 7 seats' },
  ]

  async function register() {
    try {
      const driverData = await createDriver(name, phoneNumber, email);
      if (driverData?.id) {
        await createVehicle(driverData.id, plateNumber, model, color, vehicleSelected);
        navigation.navigate("Login", {
          screen: "PhoneVerify",
          params: {
            phone: phoneNumber
          }
        });
      }
    } catch (error) {
      console.error("Error during registration:", JSON.stringify(error));
    }
  }

  return (
    <ScrollView style={styles.container} >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: FontSize.xLarge,
            color: Colors.primary,
            fontFamily: Font["poppins-bold"],
            marginVertical: Spacing * 1.2,
          }}
        >
          Create account
        </Text>
      </View>
      <View
        style={{
          position: "relative",
          marginVertical: Spacing * 3,
          marginBottom: 100,
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.green, opacity: 0.7 }}>
          Driver Information
        </Text>
        <Text style={styles.label}>Full Name</Text>
        <AppTextInput placeholder="Nguyen Van A" onChangeText={(text) => setName(text)} />
        <Text style={styles.label}>Phone Number</Text>
        <PhoneInput
          defaultCode="VN"
          onChangeFormattedText={v => {
            if (v.length <= "+84123456789".length) {
              setPhoneNumber(v);
            }
          }} />
        <Text style={styles.label}>Email</Text>
        <AppTextInput placeholder="taixe@gmail.com" onChangeText={(text) => setEmail(text)} />
        <Text style={styles.label}>Password</Text>
        <AppTextInput placeholder="" />
        <Text style={styles.label}>Confirm Password</Text>
        <AppTextInput placeholder="" />

        <Text style={{ marginTop: 15, textAlign: 'center', fontSize: 18, color: Colors.green, opacity: 0.7 }}>
          Vehicle Information
        </Text>

        <SelectList
          maxHeight={200}
          placeholder="Choose vehicle"
          setSelected={(val: React.SetStateAction<string>) => setvehicleSelected(val)}
          data={vehicles}
          save="value" />
        <Text style={styles.label}>Plate number</Text>
        <AppTextInput placeholder="" onChangeText={(text) => setPlateNumber(text)} />
        <Text style={styles.label}>Model</Text>
        <AppTextInput placeholder="" onChangeText={(text) => setModel(text)} />
        <Text style={styles.label}>Color</Text>
        <AppTextInput placeholder="" onChangeText={(text) => setColor(text)} />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={register}>
        <Text style={styles.registerButtonText}> Sign up </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing * 2,
  },
  label: {
    marginLeft: 0,
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
  headerText: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    maxWidth: "80%",
    textAlign: "center",
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
});