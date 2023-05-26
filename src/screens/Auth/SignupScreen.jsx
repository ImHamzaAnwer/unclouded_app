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
  ImageBackground,
  SafeAreaView,
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
import {TouchableOpacity} from 'react-native-gesture-handler';

const SignupScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const createUserInDB = async userId => {
    await firestore().collection('users').add({
      username,
      email,
      userId,
    });
  };

  const handleSignup = () => {
    if (!username.length) {
      Alert.alert('please enter username');
    } else if (!email.length || !email.match(EMAIL_REGEX)) {
      Alert.alert('please enter valid email address');
    } else if (password.length < 6) {
      Alert.alert('password length should be 6 or greater');
    } else if (confirmPassword !== password) {
      Alert.alert('passwords do not match');
    } else if (!termsAccepted) {
      Alert.alert('You must agree with terms & conditions');
    } else {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(doc => {
          createUserInDB(doc.user.uid);
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
    if (password.match(weakPasswordRegex)) {
      return 0;
    } else if (password.match(mediumPasswordRegex)) {
      return 1;
    } else if (password.match(strongPasswordRegex)) {
      return 2;
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
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: APP_COLORS.background,
        }}
        source={IMAGES.LoginScreenBg}>
        <SafeAreaView>
          <ScrollView style={styles.container}>
            <Image style={styles.logo} source={IMAGES.logo} />
            <AppText textType="heading">Sign Up</AppText>
            <AppText style={{marginBottom: 30}}>
              Create your account - enjoy our services with most updated
              features.
            </AppText>

            <AppText style={styles.label}>User Name</AppText>
            <AppInput
              maxLength={50}
              style={styles.signupInput}
              value={username}
              onChangeText={setUsername}
            />

            <AppText style={styles.label}>Email ID</AppText>
            <AppInput
              keyboardType="email-address"
              style={styles.signupInput}
              value={email}
              onChangeText={setEmail}
            />

            <AppText style={styles.label}>Password</AppText>
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

            <AppText style={styles.label}>Confirm Password</AppText>
            <AppInput
              style={styles.signupInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
            />
            {confirmPasswordError && (
              <AppText
                style={{marginTop: -15, marginBottom: 20}}
                textType="error">
                Password does not match
              </AppText>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setTermsAccepted(!termsAccepted)}
              style={styles.termsContainer}>
              <Image
                style={[
                  styles.checkMarkIcon,
                  {tintColor: !termsAccepted ? APP_COLORS.gray : undefined},
                ]}
                source={IMAGES.CheckMarkIcon}
              />
              <AppText>I agree with terms and conditions.</AppText>
            </TouchableOpacity>

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
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // backgroundColor: APP_COLORS.background,
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
    marginTop: 8,
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
  },
  strengthLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkMarkIcon: {
    marginRight: 10,
  },
  label: {
    marginTop: 30,
    marginBottom: 0,
  },
});

export default SignupScreen;
