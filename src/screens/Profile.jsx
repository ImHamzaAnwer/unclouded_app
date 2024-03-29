import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {APP_COLORS} from '../config/colors';
import auth from '@react-native-firebase/auth';
import {IMAGES} from '../config/images';
import AppText from '../components/AppText';

const PROFILE_ITEMS = [
  {
    name: 'Update Usage Info.',
    icon: IMAGES.UpdateUsageInfoIcon,
    routeName: 'UsageScreen',
    params: {isEdit: true},
  },
  {
    name: 'Reset Quit Date',
    icon: IMAGES.ResetQuitDateIcon,
    routeName: 'UsageScreen',
    params: {isEdit: true},
  },
  {
    name: 'Notification',
    icon: IMAGES.NotificationIcon,
    routeName: 'Notifications',
  },
  {
    name: 'Favorite Audio Tracks',
    icon: IMAGES.FavoriteIcon,
    routeName: 'Favorites',
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
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => navigation.navigate('MainTabs')}>
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
              <Pressable
                key={index}
                onPress={() => navigation.navigate(item.routeName, item.params)}
                style={styles.itemContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.iconWrap}>
                    <Image source={item.icon} />
                  </View>
                  <AppText>{item.name}</AppText>
                </View>
                <Image source={IMAGES.RightArrowIcon} />
              </Pressable>
            );
          })}

          <AppText
            onPress={async () => await auth().signOut()}
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#EB5757',
              marginTop: 40,
            }}>
            Log Out
          </AppText>
        </ScrollView>
      </SafeAreaView>
    </View>
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
    paddingHorizontal: 15,
    paddingVertical: 20,
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
