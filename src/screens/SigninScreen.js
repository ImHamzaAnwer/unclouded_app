import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const SigninScreen = () => {
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
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Signin" onPress={handleSignin} />
    </View>
  );
};

export default SigninScreen;
