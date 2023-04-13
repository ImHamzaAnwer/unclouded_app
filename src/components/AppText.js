import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {APP_COLORS} from '../config/colors';

const AppText = props => {
  const {children, style, onPress, textType} = props;
  const selectStyle = () => {
    switch (textType) {
      case 'heading':
        return styles.heading;
      case 'error':
        return styles.error;
      default:
        return styles.text;
    }
  };

  return (
    <Text onPress={onPress} style={[selectStyle(), style]}>
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
  error: {
    fontSize: 15,
    fontFamily: 'GothamRounded-Medium',
    color: APP_COLORS.error,
  },
  text: {
    marginVertical: 10,
    fontSize: 15,
    fontFamily: 'GothamRounded-Light',
    color: APP_COLORS.secondaryText,
  },
});

export default AppText;
