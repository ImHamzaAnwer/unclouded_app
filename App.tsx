/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Routes from './src/navigation';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {APP_COLORS} from './src/config/colors';

function App(): JSX.Element {
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.background}}>
      <SafeAreaView style={{flex: 1}}>
        <Routes />
      </SafeAreaView>
    </View>
  );
}

export default App;
