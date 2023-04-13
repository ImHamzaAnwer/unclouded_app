import React, {useState} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import auth from '@react-native-firebase/auth';
import {APP_COLORS} from '../config/colors';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpScreen, setOtpScreen] = useState(false);

  const handleForgotPassword = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Handle successful signup
      })
      .catch(error => {
        // Handle signup error
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      <AppText onPress={()=>navigation.goBack()} textType="heading">
        {otpScreen ? 'Forgot Password' : 'Forgot Password'}
      </AppText>
      <AppText>
        {otpScreen
          ? 'Enter the OTP we just send to your email address.'
          : 'Enter your email that you used to register your account, so we can send the OTP to reset your password.'}
      </AppText>

      {otpScreen ? (
        <>
          <OTPTextView
            handleTextChange={e => {}}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            tintColor={APP_COLORS.secondaryText}
            offTintColor={'transparent'}
          />
          <AppButton
            style={styles.authBtn}
            title="Verify OTP"
            onPress={() => setOtpScreen(false)}
          />

          <AppText style={{textAlign: 'center', marginTop: 20}}>
            Resend OTP in 1:35
          </AppText>
        </>
      ) : (
        <>
          <AppText>Email ID</AppText>
          <AppInput value={email} onChangeText={setEmail} />
          <AppButton
            style={styles.authBtn}
            title="Send OTP"
            onPress={() => setOtpScreen(true)}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 20,
    borderRadius: 100,
  },
  forgotPassText: {
    textAlign: 'right',
  },
  noAccountText: {
    textAlign: 'center',
  },
  authBtn: {
    alignSelf: 'center',
    marginTop: 50,
  },
  textInputContainer: {
    marginTop: 40,
    marginHorizontal: 40,
  },
  roundedTextInput: {
    borderRadius: 50,
    borderWidth: 3,
    // borderColor: APP_COLORS.primary,
    backgroundColor: APP_COLORS.thirdColor,
  },
});
export default ForgotPassword;
