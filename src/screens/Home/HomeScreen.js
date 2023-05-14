import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import MakePledgeComponent from '../../components/MakePledgeComponent';
import {IMAGES} from '../../config/images';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import QuittingTimer from '../../components/QuttingTimer';

export default function Home({navigation}) {
  const [userName, setUserName] = useState('');

  const fetchUsername = async () => {
    let a = await firestore()
      .collection('users')
      .where('userId', '==', auth().currentUser.uid)
      .get();

    let name = a.docs[0]._data.username;
    name = name?.split(' ')[0];
    setUserName(name);
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <AppText textType="heading" style={styles.title}>
            Hi, {userName || ''}
          </AppText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                style={{width: 50, height: 50, marginRight: 10}}
                source={IMAGES.AvatarIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: APP_COLORS.gray2,
                padding: 15,
                borderRadius: 100,
              }}
              onPress={() => navigation.navigate('Notifications')}>
              <Image
                style={{width: 20, height: 20}}
                source={IMAGES.NotificationIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <MakePledgeComponent />

        <QuittingTimer />
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
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  title: {
    fontSize: 24,
    width: '55%',
  },
  questionnaireTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  questionCard: {
    marginTop: 20,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 7,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },

  pledeModalTitle: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 40,
  },
});
