import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {APP_COLORS} from '../config/colors';

const AppDropdown = ({data, value, setValue}) => {
  return (
    <Dropdown
      activeColor={APP_COLORS.secondaryText}
      containerStyle={{borderWidth: 0}}
      itemTextStyle={styles.itemStyle}
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default AppDropdown;

const styles = StyleSheet.create({
  dropdown: {
    borderColor: APP_COLORS.primary,
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'GothamRounded-Light',
    color: APP_COLORS.primaryText,
  },
  selectedTextStyle: {
    fontFamily: 'GothamRounded-Light',
    fontSize: 16,
    color: APP_COLORS.primaryText,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemStyle: {
    fontFamily: 'GothamRounded-Light',
  },
});
