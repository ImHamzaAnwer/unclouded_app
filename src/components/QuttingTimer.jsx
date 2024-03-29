import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AppText from './AppText';
import {APP_COLORS} from '../config/colors';
import moment from 'moment';
import {IMAGES} from '../config/images';
import {fetchUsageData, userCreationTime} from '../functions';

const QuttingTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quitDate, setQuitDate] = useState(null);
  const [quitDateCreation, setQuitDateCreation] = useState(moment());

  const handleUsageData = async () => {
    let array = await fetchUsageData();
    if (array[0]?.quittingDate) {
      setQuitDate(array[0]?.quittingDate);
      setQuitDateCreation(array[0]?.createdAt?.toDate().toISOString());
    }
  };

  useEffect(() => {
    handleUsageData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - moment(quitDateCreation);
      setTimeElapsed(elapsedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [quitDateCreation]);

  const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0');
  const hours = Math.floor(
    (timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, '0');

  return (
    <View style={styles.mainRow}>
      <View style={styles.upperRow}>
        <AppText style={styles.title}>Progress Track</AppText>
        <TouchableOpacity>
          <Image source={IMAGES.InformationIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <AppText style={styles.timeTitle}>Days</AppText>
        <AppText style={styles.timeTitle}>Hours</AppText>
        <AppText style={styles.timeTitle}>Minutes</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.time}>{days}</AppText>
        <AppText style={styles.time}>:</AppText>
        <AppText style={styles.time}>{hours}</AppText>
        <AppText style={styles.time}>:</AppText>
        <AppText style={styles.time}>{minutes}</AppText>
      </View>

      {quitDate && (
        <View style={styles.dateWrap}>
          <AppText style={styles.date}>
            Quit Date:{' '}
            <AppText style={{fontWeight: '600'}}>
              {moment(quitDate).format('DD MMM, YYYY')}
            </AppText>
          </AppText>
        </View>
      )}
    </View>
  );
};

export default QuttingTimer;

const styles = StyleSheet.create({
  title: {
    color: APP_COLORS.primaryText,
    fontSize: 18,
    fontWeight: '500',
  },
  row: {
    width: '70%',
    flexDirection: 'row',
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
  mainRow: {
    width: '100%',
    margin: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  upperRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  dateWrap: {
    width: '90%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: APP_COLORS.gray,
  },
  date: {
    marginTop: 15,
    marginBottom: 25,
    fontSize: 16,
  },
});
