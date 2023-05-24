import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {APP_COLORS} from '../config/colors';
import AppText from './AppText';
import moment from 'moment';
import {createNotification, userCreationTime} from '../functions';
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

      <View style={styles.dataContainer}>
        {symptoms.map((x, i) => {
          return (
            <View key={i} style={styles.dotContainer}>
              <View style={[styles.dot, {backgroundColor: x.frontColor}]} />
              <AppText style={styles.text}>{x.name}</AppText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    borderBottomColor: APP_COLORS.gray2
  },
  dotContainer: {
    marginHorizontal: 10,
    marginBottom: 15,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 17,
    height: 17,
    borderRadius: 100,
    marginRight: 5,
  },
  text: {
    marginVertical: 0,
    fontSize: 13,
  },
});

export default SymptomsChart;
