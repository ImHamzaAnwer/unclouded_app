import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from './AppText';
import moment from 'moment';
import {APP_COLORS} from '../config/colors';
import LinearGradient from 'react-native-linear-gradient';

const CustomTabs = ({tabValues, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={[styles.btn, styles.btn1Radius]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          activeTab === 0
            ? APP_COLORS.buttonGradient
            : [APP_COLORS.thirdColor, APP_COLORS.thirdColor]
        }>
        <TouchableOpacity
          style={styles.btnInner}
          onPress={() => setActiveTab(0)}>
          <AppText style={styles.text}>{tabValues[0]}</AppText>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        style={[styles.btn, styles.btn2Radius]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          activeTab === 1
            ? APP_COLORS.buttonGradient
            : [APP_COLORS.thirdColor, APP_COLORS.thirdColor]
        }>
        <TouchableOpacity
          style={styles.btnInner}
          onPress={() => setActiveTab(1)}>
          <AppText style={styles.text}>{tabValues[1]}</AppText>
        </TouchableOpacity>
      </LinearGradient>
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
    textAlign: 'center',
  },
  btn: {
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APP_COLORS.itemBackground,
    width: '47%',
  },
  btnInner: {
    width: '100%',
    paddingVertical: 5,
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
