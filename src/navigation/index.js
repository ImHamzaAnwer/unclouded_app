import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import auth from '@react-native-firebase/auth';

const Routes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log(user, 'userrrr---');
      setUser(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {!user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Routes;
