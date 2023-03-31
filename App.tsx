/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AudioPlayer from './src/screens/AudioPlayerScreen';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AudioPlayer />
    </SafeAreaView>
  );
}

export default App;
