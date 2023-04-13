import React from 'react';
import {StyleSheet, Text, ActivityIndicator} from 'react-native';
import {APP_COLORS} from '../config/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AppButton = props => {
  const {title, style, onPress, loading} = props;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.btn, style]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: APP_COLORS.primary,
    // paddingVertical: 8,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 100,
    width: '95%',
    height: 56,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'GothamRounded-Medium',
    color: APP_COLORS.primaryText,
  },
});

export default AppButton;