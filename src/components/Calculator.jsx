import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {IMAGES} from '../config/images';
import AppText from './AppText';
import {APP_COLORS} from '../config/colors';

const Calculator = ({item, index}) => {
  const [totalSavings, setTotalSaving] = useState(0);
  const [notSmoked, setNotSmoked] = useState(0);

  const styles = StyleSheet.create({
    usageItem: {
      backgroundColor: APP_COLORS.itemBackground,
      borderRadius: 20,
      marginVertical: 15,
    },
    usageMethodText: {
      fontSize: 16,
      color: APP_COLORS.primaryText,
      textTransform: 'capitalize',
      fontWeight: 400,
    },
    cut: {
      backgroundColor: APP_COLORS.background,
      width: 80,
      height: 15,
      borderRadius: 6,
      marginTop: -8,
      alignSelf: 'center',
      // transform: [{skewX: '45deg'}],
    },
    contentContainer: {
      paddingHorizontal: 10,
      marginVertical: 8,
    },
    contentContainerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 10,
      justifyContent: 'space-between',
    },
    text: {
      marginVertical: 0,
    },

    editBtn: {
      width: 70,
      height: 35,
      borderRadius: 8,
    },
    bottomRowText: {
      textTransform: 'capitalize',
      marginVertical: 0,
      fontSize: 17,
      color: APP_COLORS.primaryText,
      fontWeight: 500,
    },
    bottomRowText2: {
      color: APP_COLORS.primaryText,
      fontWeight: 200,
    },
  });

  return (
    <View style={{paddingHorizontal: 20}}>
      <AppText textType="heading">Calculator</AppText>
      <View key={index} style={styles.usageItem}>
        <View style={styles.cut} />
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.contentContainerRow,
              {borderBottomWidth: 0.5, borderBottomColor: APP_COLORS.gray},
            ]}>
            <AppText style={[styles.text, styles.usageMethodText]}>
              Not Smoked
            </AppText>

            <AppText style={[styles.text, styles.usageMethodText]}>
              25 Bowls
            </AppText>
          </View>

          <View style={styles.contentContainerRow}>
            <View>
              <AppText>Total Saved Money</AppText>
              <AppText>$120</AppText>
            </View>
            <Image source={IMAGES.calculatorIcon} />
          </View>
        </View>
        <View style={[styles.cut, {marginBottom: -8}]} />
      </View>
    </View>
  );
};

export default Calculator;
