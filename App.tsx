/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Routes from './src/navigation';
import {StatusBar, View} from 'react-native';
import {APP_COLORS} from './src/config/colors';
import {Provider as PaperProvider} from 'react-native-paper';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <View style={{flex: 1, backgroundColor: APP_COLORS.background}}>
        <StatusBar barStyle="light-content" />
        <Routes />
      </View>
    </PaperProvider>
  );
}

export default App;
