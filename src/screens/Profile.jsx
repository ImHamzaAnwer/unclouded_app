import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {APP_COLORS} from '../config/colors';
import auth from '@react-native-firebase/auth';
import {IMAGES} from '../config/images';
import AppText from '../components/AppText';

const PROFILE_ITEMS = [
  {
    name: 'Update Usage Info.',
    icon: IMAGES.UpdateUsageInfoIcon,
    routeName: '',
  },
  {
    name: 'Reset Quit Date',
    icon: IMAGES.ResetQuitDateIcon,
    routeName: '',
  },
  {
    name: 'Notification',
    icon: IMAGES.NotificationIcon,
    routeName: '',
  },
  {
    name: 'Favorite Audio Tracks',
    icon: IMAGES.FavoriteIcon,
    routeName: '',
  },
  {
    name: 'Help Center',
    icon: IMAGES.HelpCenterIcon,
    routeName: '',
  },
  {
    name: 'Terms & Conditions',
    icon: IMAGES.TermsAndConditionsIcon,
    routeName: '',
  },
];

export default function Profile({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <Image
            style={{width: 25, height: 25, marginRight: 10}}
            source={IMAGES.BackArrowIcon}
          />
          <AppText textType="heading" style={styles.title}>
            Profile
          </AppText>
        </TouchableOpacity>
      </View>

      {PROFILE_ITEMS.map((item, index) => {
        return (
          <View style={styles.itemContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.iconWrap}>
                <Image source={item.icon} />
              </View>
              <AppText>{item.name}</AppText>
            </View>
            <Image source={IMAGES.RightArrowIcon} />
          </View>
        );
      })}

      <AppText
        onPress={() => auth().signOut()}
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#EB5757',
          marginTop: 40,
        }}>
        Log Out
      </AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  title: {
    fontSize: 24,
  },
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: APP_COLORS.itemBackground,
  },
  iconWrap: {
    backgroundColor: APP_COLORS.itemBackground,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
});
