/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import PaymentHeader from '../components/PaymentHeader';
import PaymentRiderInfor from '../components/PaymentRiderInfor';
import PaymentSuccessButton from '../components/PaymentSuccessButton';
import PaymentFailButton from '../components/PaymentFailButton';
import PaymentPrice from '../components/PaymentPrice';

// Navigations
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentScreenNavigationProp = NavigationProp<RootStackParamList, 'Payment'>;

type PaymentScreenProps = {
  route: PaymentScreenRouteProp;
  navigation: PaymentScreenNavigationProp;
};

const PaymentFirstScreen = ({ navigation, route }: PaymentScreenProps): JSX.Element => {
  const handleCancel = () => {
    // Handle cancel action
    navigation.navigate('Driving', { tripId: '123' });
  };

  const handleContinue = () => {
    // Handle continue action
    navigation.navigate('CongratsPayment', { paymentId: '1238721267' });
  };

  const { paymentId } = route.params;

  return (
    <View style={styles.wrapper}>
      <View style={styles.paymentHeaderComponent}>
        <PaymentHeader />
      </View>
      <View style={styles.paymentRiderInforComponent}>
        <PaymentRiderInfor />
        <View style={styles.paymentInforComponent}>
          <PaymentPrice screen="PaymentFirstScreen" />
          <Text>Payment ID: {paymentId}</Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <PaymentFailButton text="Huỷ" onPress={handleCancel} />
        <PaymentSuccessButton
          text="Tiến hành"
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#747B89',
  },
  paymentHeaderComponent: {
    marginTop: 25,
  },
  paymentRiderInforComponent: {
    paddingHorizontal: 15,
    marginTop: 30,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    marginBottom: 50,
  },
  paymentInforComponent: {
    // paddingHorizontal: 15,
  },
});

export default PaymentFirstScreen;
