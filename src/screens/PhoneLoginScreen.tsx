/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, createRef } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

// Constants
import Colors from '../constants/Colors';
import Font from '../constants/Font';

// Navigation
import { LoginStackSreenProps } from '../types/Login';

function PhoneLogin({ navigation, route }: LoginStackSreenProps) {
  const [validNumber, setValidNumber] = useState<boolean>(false);
  const phoneRef = createRef<PhoneInput>();
  const formatedPhone = useRef<string>('');

  function onPhoneChangeText(phone: string) {
    if (validNumber !== phoneRef.current?.isValidNumber(phone)) {
      setValidNumber(!validNumber);
    }
  }

  function onFormatedPhoneChange(phone: string) {
    formatedPhone.current = phone;
    //Exception testing number
    if (phone.length === '+84123321123'.length) {
      setValidNumber(true);
    }
  }

  function onConfirmPhoneNumber() {
    navigation.navigate('PhoneVerify', { phone: formatedPhone.current });
  }

  return (<View style={styles.screenContainer}>
    <View style={styles.phoneStyle}>
      <Text style={{ alignSelf: 'flex-start' }}>Phone number</Text>
      <PhoneInput
        ref={phoneRef}
        onChangeText={onPhoneChangeText}
        onChangeFormattedText={onFormatedPhoneChange}
        flagButtonStyle={{ backgroundColor: 'transparent', ...styles.bottomBlackBorder }}
        textInputStyle={{ backgroundColor: 'transparent', padding: 0 }}
        textContainerStyle={{ backgroundColor: 'transparent', padding: 0, ...styles.bottomBlackBorder }}
        containerStyle={styles.phoneInputContainer} defaultCode="VN" />
    </View>

    <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD"
      disabled={!validNumber}
      style={[styles.nextButtonWrapper, { opacity: validNumber ? 1 : 0.5 }]}
      onPress={onConfirmPhoneNumber} >
      <View style={styles.nextButton}>
        <Text style={styles.buttonText}> Next </Text>
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
  phoneStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 42,
    paddingHorizontal: 20,
  },
  phoneInputContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 0,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: Font['poppins-bold'],
  },
  bottomBlackBorder: {
    borderColor: 'transparent',
    borderBottomColor: 'black',
    borderWidth: 1,
  },
});

export default PhoneLogin;
