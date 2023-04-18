import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from './AppText';
import moment from 'moment';
import {APP_COLORS} from '../config/colors';

const CustomTabs = ({onPress, tabValues, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setActiveTab(0)}
        style={[
          styles.btn,
          styles.btn1Radius,
          {
            backgroundColor:
              activeTab === 0
                ? APP_COLORS.thirdColor
                : APP_COLORS.itemBackground,
          },
        ]}>
        <AppText style={styles.text}>{tabValues[0]}</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveTab(1)}
        style={[
          styles.btn,
          styles.btn2Radius,
          {
            backgroundColor:
              activeTab === 1
                ? APP_COLORS.thirdColor
                : APP_COLORS.itemBackground,
          },
        ]}>
        <AppText style={styles.text}>{tabValues[1]}</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: APP_COLORS.itemBackground,
  },
  text: {
    color: APP_COLORS.primaryText,
  },
  btn: {
    marginVertical: 8,
    paddingVertical: 5,
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APP_COLORS.itemBackground,
  },
  btn1Radius: {
    marginRight: '1%',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  btn2Radius: {
    marginLeft: '1%',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
});

export default CustomTabs;
