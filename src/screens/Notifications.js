import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';
import {APP_COLORS} from '../config/colors';
import AppText from '../components/AppText';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import {
  createNotification,
  userId,
  formatFirebaseTimestamp,
  groupByDate,
} from '../functions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IMAGES} from '../config/images';
import moment from 'moment';

function Notifiactions({navigation}) {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    firestore()
      .collection('notifications')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        const array = [];
        querySnapshot?.forEach(doc => {
          array.push({
            id: doc.id,
            notification: doc.data().notification,
            createdAt: doc.data().createdAt,
            date: moment(doc.data().createdAt?.toDate()?.toISOString()).format(
              'DD-MM-YYYY',
            ),
          });
        });
        const groupedAnswers = groupByDate(array);
        setNotifications(groupedAnswers);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderNotification = ({item, index}) => (
    <View key={index}>
      <AppText style={styles.sectionHeader}>{item}</AppText>
      {notifications[item].map(notification => (
        <View style={styles.notificationItem}>
          <View style={styles.iconContainer}>
            <Image source={IMAGES.AnxietyIcon} />
          </View>
          <View>
            <AppText style={styles.notificationTitle}>
              {notification.notification}
            </AppText>
            <AppText style={styles.notificationSubtitle}>
              {formatFirebaseTimestamp(notification.createdAt)}
            </AppText>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS.background,
      }}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.goBack()}>
            <Image
              style={{width: 25, height: 25, padding: 10, marginRight: 10}}
              source={IMAGES.BackArrowIcon}
            />
            <AppText textType="heading">Notifications</AppText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {Object.values(notifications).length ? (
        <FlatList
          contentContainerStyle={{padding: 20}}
          data={Object.keys(notifications)}
          renderItem={renderNotification}
        />
      ) : (
        <AppText style={{padding: 20}}>No notifications found</AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  notificationTitle: {
    marginVertical: 0,
    fontSize: 17,
    width: '90%',
    color: APP_COLORS.primaryText,
  },
  notificationSubtitle: {
    fontSize: 13,
    color: APP_COLORS.gray,
    marginTop: 7,
    marginBottom: 0,
  },
  iconContainer: {
    padding: 16,
    borderRadius: 100,
    backgroundColor: APP_COLORS.itemBackground,
    marginRight: 10,
  },
});

export default Notifiactions;
