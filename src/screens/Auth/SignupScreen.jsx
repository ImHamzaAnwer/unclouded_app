import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import {
  EMAIL_REGEX,
  mediumPasswordRegex,
  strongPasswordRegex,
  weakPasswordRegex,
} from '../../config/regexes';
import {IMAGES} from '../../config/images';

const SignupScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!username.length) {
      Alert.alert('please enter username');
    } else if (!email.length || !email.match(EMAIL_REGEX)) {
      Alert.alert('please enter valid email address');
    } else if (!password.length) {
      Alert.alert('please enter password');
    } else if (confirmPassword !== password) {
      Alert.alert('passwords do not match');
    } else {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
          // Handle successful signup
        })
        .catch(error => {
          if (error?.message?.includes('auth/email-already-in-use')) {
            Alert.alert('email is already in use');
          }
          console.log(error.message, 'err-----');
          setLoading(false);
          // Handle signup error
        });
    }
  };

  const handlePasswordChange = password => {
    setPassword(password);
  };

  const calculatePasswordStrength = password => {
    if (password.length) {
      if (weakPasswordRegex.test(password)) {
        return 0; // Weak
      } else if (mediumPasswordRegex.test(password)) {
        return 1; // Medium
      } else if (strongPasswordRegex.test(password)) {
        console.log('aya---------------');
        return 2; // Strong
      } else {
        return 0; // Weak (if password doesn't match any of the regex)
      }
    }
  };

  const getStrengthLabel = score => {
    switch (score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Medium';
      case 2:
        return 'Strong';
      default:
        return null;
    }
  };

  const strengthScore = calculatePasswordStrength(password);
  const strengthLabel = getStrengthLabel(strengthScore);
  const strengthColor =
    strengthScore === 0 ? 'red' : strengthScore === 1 ? 'orange' : 'green';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Image style={styles.logo} source={IMAGES.logo} />
        <AppText textType="heading">Sign Up</AppText>
        <AppText style={{marginBottom: 30}}>
          Create your account - enjoy our services with most updated features.
        </AppText>

        <AppText>User Name</AppText>
        <AppInput
          style={styles.signupInput}
          value={username}
          onChangeText={setUsername}
        />

        <AppText>Email ID</AppText>
        <AppInput
          keyboardType="email-address"
          style={styles.signupInput}
          value={email}
          onChangeText={setEmail}
        />

        <AppText>Password</AppText>
        <AppInput
          style={styles.signupInput}
          value={password}
          onChangeText={handlePasswordChange}
          isPassword
        />

        {strengthLabel && (
          <>
            <View style={styles.strengthMeterContainer}>
              <View
                style={[
                  styles.strengthMeter,
                  {
                    backgroundColor: strengthColor,
                    width: `${(strengthScore + 1) * 33.33}%`,
                  },
                ]}
              />
            </View>
            <AppText>Level: {strengthLabel}</AppText>
          </>
        )}

        <AppText>Confirm Password</AppText>
        <AppInput
          style={styles.signupInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isPassword
        />
        {confirmPasswordError && (
          <AppText style={{marginTop: -15, marginBottom: 20}} textType="error">
            Password does not match
          </AppText>
        )}

        <View style={styles.termsContainer}>
          <AppText>I agree with terms and conditions.</AppText>
        </View>

        <AppButton
          disabled={loading}
          loading={loading}
          style={styles.authBtn}
          title="Signin"
          onPress={handleSignup}
        />
        <AppText
          onPress={() => navigation.navigate('Signin')}
          style={styles.noAccountText}>
          Already have an account? Sign In
        </AppText>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
  signupInput: {
    marginBottom: 25,
  },
  strengthMeterContainer: {
    height: 5,
    // width: '75%',
    backgroundColor: APP_COLORS.primary,
    // borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  strengthMeter: {
    height: '100%',
    // borderRadius: 5,
  },
  strengthLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  termsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default SignupScreen;
