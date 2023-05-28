import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
// import OTPTextView from 'react-native-otp-textinput';
import {APP_COLORS} from '../../config/colors';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppText from '../../components/AppText';
import auth from '@react-native-firebase/auth';
import {IMAGES} from '../../config/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {EMAIL_REGEX} from '../../config/regexes';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otpScreen, setOtpScreen] = useState(false);

  const handleForgotPassword = () => {
    if (!email.length || !email.match(EMAIL_REGEX)) {
      Alert.alert('Please enter a valid email address');
    } else {
      // const actionCodeSettings = {
      //   iOS: {
      //     bundleId: 'com.unclouded',
      //   },
      //   android: {
      //     packageName: 'com.unclouded',
      //   },
      // };
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setOtpScreen(true);
          // Handle successful signup
        })
        .catch(error => {
          console.log(error, 'error check----');
          if (
            error?.message?.includes(
              'There is no user record corresponding to this identifier',
            )
          ) {
            Alert.alert('No user found with this email');
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
        }}
        source={IMAGES.LoginScreenBg}>
        <SafeAreaView
          style={{
            paddingVertical: 40,
            paddingHorizontal: 20,
          }}>
          <Image style={styles.logo} source={IMAGES.logo} />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.header}
            onPress={() => navigation.goBack()}>
            <Image style={{marginRight: 10}} source={IMAGES.BackArrowIcon} />
            <AppText textType="heading">{'Forgot Password'}</AppText>
          </TouchableOpacity>
          <AppText>
            {otpScreen
              ? `Password reset email has been sent to ${email}`
              : 'Enter your email that you used to register your account, we will email you a link to reset your password.'}
          </AppText>

          {otpScreen ? (
            <>
              {/* <OTPTextView
            handleTextChange={e => {}}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            tintColor={APP_COLORS.secondaryText}
            offTintColor={'transparent'}
          /> */}
              <AppText style={{marginTop: 50, color: APP_COLORS.primaryText}}>
                Please tap on the link in your email inbox to reset password
              </AppText>
              <AppButton
                style={styles.authBtn}
                title="Back"
                onPress={() => setOtpScreen(false)}
              />

              {/* <AppText style={{textAlign: 'center', marginTop: 20}}>
            Resend OTP in 1:35
          </AppText> */}
            </>
          ) : (
            <>
              <AppText style={{marginTop: 20}}>Email ID</AppText>
              <AppInput
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <AppButton
                style={styles.authBtn}
                title="Send Reset Link"
                onPress={handleForgotPassword}
              />
            </>
          )}
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  logo: {
    width: 75,
    height: 75,
    marginVertical: 20,
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
    marginTop: 30,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ForgotPassword;
