import {createStackNavigator} from '@react-navigation/stack';
import SigninScreen from '../screens/Auth/SigninScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Signin">
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
