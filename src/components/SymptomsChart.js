import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {APP_COLORS} from '../config/colors';
import AppText from './AppText';
import moment from 'moment';
import {userCreationTime} from '../functions';
import {symptoms} from '../config/symptoms';
import {BarChart} from 'react-native-gifted-charts';

const SymptomsChart = () => {
  const [bars, setBars] = useState([]);

  let date = moment(userCreationTime).format('YYYY-MM-DD');
  const accountCreationDate = new Date(date); // Replace this with your account creation date

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newCountdowns = symptoms.map(symptom => {
        const expectedDate = new Date(
          accountCreationDate.getTime() +
            symptom.expectedDays * 24 * 60 * 60 * 1000,
        );
        const diff = expectedDate.getTime() - now.getTime();

        const completed = diff <= 0;
        const progress = completed
          ? 100
          : (1 - diff / (symptom.expectedDays * 24 * 60 * 60 * 1000)) * 100;

        return {
          name: symptom.name,
          completed,
          progress,
          value: progress,
          ...symptom,
          topLabelComponent: () => (
            <Text style={{fontSize: 10, color: '#fff', marginLeft: -15}}>
              {progress.toFixed(1)} %
            </Text>
          ),
        };
      });
      setBars(newCountdowns);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <AppText style={{marginBottom: 40}} textType="heading">
        Symptoms Countdown
      </AppText>
      <BarChart
        width={Dimensions.get('window').width - 80}
        activeOpacity={1}
        showFractionalValue
        yAxisColor={APP_COLORS.gray}
        yAxisTextStyle={{color: APP_COLORS.secondaryText}}
        xAxisColor={APP_COLORS.gray}
        hideRules
        noOfSections={5}
        maxValue={100}
        data={bars}
        barWidth={43}
        sideWidth={15}
        isThreeD
        side="right"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    // backgroundColor: 'orange',
    // marginVertical: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default SymptomsChart;
