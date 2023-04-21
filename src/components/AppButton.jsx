import React from 'react';
import {StyleSheet, Text, ActivityIndicator} from 'react-native';
import {APP_COLORS} from '../config/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const AppButton = props => {
  const {title, style, onPress, loading} = props;
  return (
    <LinearGradient
      {...props}
      style={[styles.btn, style]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={APP_COLORS.buttonGradient}>
      <TouchableOpacity
        style={styles.innerBtn}
        activeOpacity={0.8}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 100,
    width: '95%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'GothamRounded-Medium',
    color: APP_COLORS.primaryText,
  },
  innerBtn: {
    width: '100%',
    height: 56,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default AppButton;
