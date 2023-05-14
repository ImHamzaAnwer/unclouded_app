import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {APP_COLORS} from '../config/colors';
import auth from '@react-native-firebase/auth';
import AppText from '../components/AppText';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMAGES} from '../config/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Popover, {PopoverPlacement} from 'react-native-popover-view';

const SymptomsCard = ({countdown, key}) => {
  const styles = StyleSheet.create({
    usageItem: {
      backgroundColor: APP_COLORS.itemBackground,
      borderRadius: 20,
      marginVertical: 15,
      overflow: 'hidden',
    },
    symptomName: {
      fontSize: 16,
      color: APP_COLORS.primaryText,
      fontWeight: 400,
    },
    cut: {
      backgroundColor: APP_COLORS.background,
      width: 80,
      height: 15,
      borderRadius: 6,
      marginTop: -8,
      alignSelf: 'center',
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
    row: {
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    timeTitle: {
      alignSelf: 'center',
      textAlign: 'center',
    },
    time: {
      fontSize: 36,
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
      color: APP_COLORS.primaryText,
    },
  });
  return (
    <ImageBackground
      imageStyle={{opacity: 0.05}}
      source={IMAGES.SymptomBg}
      style={styles.usageItem}>
      <View style={styles.cut} />
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.contentContainerRow,
            {borderBottomWidth: 0.5, borderBottomColor: APP_COLORS.gray},
          ]}>
          <AppText style={[styles.text, styles.symptomName]}>
            {countdown.name} ({countdown.progress.toFixed(0)}%)
          </AppText>

          <Popover
            popoverStyle={{
              backgroundColor: APP_COLORS.itemBackground,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            placement={PopoverPlacement.LEFT}
            from={
              <TouchableOpacity>
                <Image source={IMAGES.InformationIcon} />
              </TouchableOpacity>
            }>
            <AppText>Withdrawal Symptom</AppText>
            <AppText style={{color: APP_COLORS.primaryText}}>
              These symptoms can range from mild to severe, and they vary from
              person to person. The symptoms may not be severe or dangerous, but
              they can be unpleasant.
            </AppText>
          </Popover>
        </View>

        <View style={[styles.contentContainerRow, {flexDirection: 'column'}]}>
          {countdown.completed ? (
            <AppText textType="heading">Completed</AppText>
          ) : (
            <>
              <View style={styles.row}>
                <AppText style={styles.timeTitle}>Days</AppText>
                <AppText style={styles.timeTitle}>Hours</AppText>
                <AppText style={styles.timeTitle}>Minutes</AppText>
              </View>
              <View style={styles.row}>
                <AppText style={styles.time}>{countdown.days}</AppText>
                <AppText style={styles.time}>:</AppText>
                <AppText style={styles.time}>{countdown.hours}</AppText>
                <AppText style={styles.time}>:</AppText>
                <AppText style={styles.time}>{countdown.minutes}</AppText>
              </View>
            </>
          )}
        </View>
      </View>
      <View style={[styles.cut, {marginBottom: -8}]} />
    </ImageBackground>
  );
};

const CountdownScreen = () => {
  const symptoms = [
    {name: 'Reset Tolerance', expectedDays: 7.8},
    {name: 'REM Rebound', expectedDays: 15.1},
    {name: 'Insomnia', expectedDays: 30.2},
    {name: 'Anxiety', expectedDays: 24},
  ];

  const [countdowns, setCountdowns] = useState([]);

  let date = moment(auth().currentUser.metadata.creationTime).format(
    'YYYY-MM-DD',
  );
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
        const days = Math.floor(diff / (24 * 60 * 60 * 1000))
          .toString()
          .padStart(2, '0');
        const hours = Math.floor(
          (diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
        )
          .toString()
          .padStart(2, '0');
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
          .toString()
          .padStart(2, '0');
        const seconds = Math.floor((diff % (60 * 1000)) / 1000)
          .toString()
          .padStart(2, '0');

        const completed = diff <= 0;
        const progress = completed
          ? 100
          : (1 - diff / (symptom.expectedDays * 24 * 60 * 60 * 1000)) * 100;

        return {
          name: symptom.name,
          days,
          hours,
          minutes,
          seconds,
          completed,
          progress,
        };
      });
      setCountdowns(newCountdowns);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AppText textType="heading">Symptoms Countdown</AppText>
        <ScrollView>
          {countdowns.map(countdown => (
            <>
              <SymptomsCard key={countdown.name} countdown={countdown} />
            </>
          ))}
          <View style={{height: 130}} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: APP_COLORS.background,
  },
});

export default CountdownScreen;
