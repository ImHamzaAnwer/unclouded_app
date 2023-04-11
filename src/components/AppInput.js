import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {APP_COLORS} from '../config/colors';

const AppInput = props => {
  const {value, isPassword, style, onChangeText} = props;
  return (
    <TextInput
      {...props}
      value={value}
      placeholder=""
      style={[styles.input, style]}
      secureTextEntry={isPassword}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: APP_COLORS.primary,
    fontSize: 16,
    fontFamily: 'GothamRounded-Medium',
    color: APP_COLORS.primaryText,
  },
  text: {
    fontSize: 16,
    fontFamily: 'GothamRounded-Light',
    color: APP_COLORS.secondaryText,
  },
});

export default AppInput;
