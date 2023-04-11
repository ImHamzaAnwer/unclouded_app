import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {APP_COLORS} from '../config/colors';

const AppText = ({children, heading, style, onPress}) => {
  return (
    <Text
      onPress={onPress}
      style={[heading ? styles.heading : styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginVertical: 5,
    fontSize: 24,
    fontFamily: 'GothamRounded-Medium',
    color: APP_COLORS.primaryText,
  },
  text: {
    marginVertical: 10,
    fontSize: 15,
    fontFamily: 'GothamRounded-Light',
    color: APP_COLORS.secondaryText,
  },
});

export default AppText;
