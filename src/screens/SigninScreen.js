import React, {useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import {APP_COLORS} from '../config/colors';

const SigninScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Handle successful signin
      })
      .catch(error => {
        // Handle signin error
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <AppText textType="heading">Sign In</AppText>
        <AppText style={{marginBottom: 30}}>
          Sign In to your account - enjoy exclusive features and many more.
        </AppText>
        <AppText>Email ID:</AppText>
        <AppInput value={email} onChangeText={setEmail} />
        <AppText>Password:</AppText>
        <AppInput value={password} onChangeText={setPassword} isPassword />
        <AppText
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPassText}>
          Forgot Password?
        </AppText>
        <AppButton
          style={styles.authBtn}
          title="Signin"
          onPress={handleSignin}
        />
        <AppText
          onPress={() => navigation.navigate('Signup')}
          style={styles.noAccountText}>
          Don't have an account? Sign Up
        </AppText>
      </ScrollView>
    </KeyboardAvoidingView>
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
});

export default SigninScreen;
