import React, {useState} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';

const AudioLibrary = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <AppText onPress={() => navigation.navigate('AudioPlayer')} textType="heading">
        Audio Library
      </AppText>
    </ScrollView>
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
  textInputContainer: {
    marginTop: 40,
    marginHorizontal: 40,
  },
  roundedTextInput: {
    borderRadius: 50,
    borderWidth: 3,
    // borderColor: APP_COLORS.primary,
    backgroundColor: APP_COLORS.thirdColor,
  },
});
export default AudioLibrary;
