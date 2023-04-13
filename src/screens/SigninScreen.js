import React, {useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import {APP_COLORS} from '../config/colors';
import {EMAIL_REGEX} from '../config/regexes';

const SigninScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignin = () => {
    if (!email.length || !email.match(EMAIL_REGEX)) {
      Alert.alert('please enter valid email address');
    }
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        // Handle successful signin
      })
      .catch(error => {
        if (error?.message?.includes('auth/wrong-password')) {
          Alert.alert('wrong password, please try again');
        } else if (
          error?.message?.includes(
            'There is no user record corresponding to this identifier',
          )
        ) {
          Alert.alert('No user found with this email');
        }
        console.log(error.message, 'rtt in signin');
        setLoading(false);
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
          disabled={loading}
          loading={loading}
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
    marginTop: 20,
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
