import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {APP_COLORS} from '../config/colors';

const AppInput = props => {
  const {
    value,
    isPassword,
    style,
    onChangeText,
    placeholder,
    icon,
    onIconPress,
    containerStyle,
  } = props;

  const [showPassword, setShowPassword] = useState(isPassword);
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...props}
        autoCapitalize={'none'}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={APP_COLORS.thirdColor}
        style={[styles.input, style]}
        secureTextEntry={showPassword}
        onChangeText={onChangeText}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            resizeMode="contain"
            style={[
              styles.icon,
              {tintColor: !showPassword ? APP_COLORS.aqua : undefined},
            ]}
            source={icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: APP_COLORS.primary,
    paddingBottom: 5,
  },
  input: {
    width: '92%',
    fontSize: 16,
    fontFamily: 'GothamRounded-Medium',
    color: APP_COLORS.primaryText,
  },
  icon: {
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'GothamRounded-Light',
    color: APP_COLORS.secondaryText,
  },
});

export default AppInput;
