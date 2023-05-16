import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Touchable, View} from 'react-native';
import AppText from './AppText';
import moment from 'moment';
import {APP_COLORS} from '../config/colors';
import AppButton from './AppButton';
import {Image} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IMAGES} from '../config/images';
import AppModal from './AppModal';
import AppInput from './AppInput';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {createNotification, userId} from '../functions';

const MakePledgeComponent = () => {
  const today = moment().format('YYYY-MM-DD');
  const navigation = useNavigation();

  const [pledgedModal, setPledgeModal] = useState(false);
  const [pledgedToday, setPledgedToday] = useState(false);
  const [pledgedReviewed, setPledgeReviewed] = useState(false);
  const [note, setNote] = useState('');

  const pledgeToday = async () => {
    firestore().collection('dailyPledges').add({
      pledged: true,
      date: today,
      userId: userId,
      note,
      createdAt: firebase.firestore.Timestamp.now(),
    });
    await createNotification('Congrats! You made your pledge for today.');
    setPledgedToday(true);
    setPledgeModal(false);
  };

  const checkIfPledgedToday = () => {
    let query = firestore()
      .collection('dailyPledges')
      .where('userId', '==', userId);
    let unsubscribe = query?.onSnapshot(querySnapshot => {
      querySnapshot?.forEach(doc => {
        if (doc.exists && doc.data().pledged && doc.data().date === today) {
          setPledgedToday(true);
          setPledgeModal(false);
        } else {
          setPledgedToday(false);
        }
      });
    });

    return () => unsubscribe();
  };

  const checkIfPledgeReviewedToday = () => {
    let query = firestore()
      .collection('pledgesReview')
      .where('user', '==', userId);
    let unsubscribe = query?.onSnapshot(querySnapshot => {
      querySnapshot?.forEach(doc => {
        console.log(doc, 'doccc-c-c-c--');
        if (
          doc.exists &&
          moment(doc.data().date?.toDate()?.toISOString()).format(
            'YYYY-MM-DD',
          ) === today
        ) {
          setPledgeReviewed(true);
        }
      });
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    checkIfPledgedToday();
    checkIfPledgeReviewedToday();
  }, [pledgedToday, pledgedReviewed]);

  return (
    <View style={styles.container}>
      <View style={styles.btnWrap}>
        <AppText style={styles.date}>
          {pledgedToday ? 'Way to go!' : moment().format('DD, MMM YYYY')}
        </AppText>
        <AppText>
          {pledgedToday
            ? "You've committed to your daily pledge."
            : 'Make a pledge to improve your life.'}
        </AppText>

        <TouchableOpacity
          onPress={() =>
            pledgedToday
              ? pledgedReviewed
                ? Alert.alert('Already Reviewed for today')
                : navigation.navigate('PledgeScreen')
              : setPledgeModal(true)
          }
          style={styles.btn}>
          <AppText style={styles.btnText}>
            {pledgedToday
              ? pledgedReviewed
                ? 'Reviewed for today'
                : "Review  Today's Pledge"
              : "Make  Today's Pledge"}
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          source={pledgedToday ? IMAGES.reviewPledge : IMAGES.makePledge}
        />
      </View>

      <AppModal isVisible={pledgedModal} setIsVisible={setPledgeModal}>
        <AppText style={styles.pledeModalTitle} textType="heading">
          Today, I will not smoke
        </AppText>
        <AppText>I'm doing this because...</AppText>
        <AppInput
          value={note}
          onChangeText={setNote}
          multiline
          maxLength={200}
        />
        <AppButton onPress={pledgeToday} style={{marginTop: 40}} title="save" />
      </AppModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // height: 140,
    backgroundColor: APP_COLORS.pledgeCardColor,
    margin: 15,
    borderRadius: 20,
  },
  btnWrap: {
    paddingVertical: 20,
    paddingLeft: 15,
    width: '60%',
    // alignSelf: 'center',
  },
  btn: {
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
    borderRadius: 20,
    backgroundColor: APP_COLORS.primaryText,
  },
  btnText: {
    padding: 10,
    color: APP_COLORS.background,
    marginVertical: 0,
  },
  date: {
    fontSize: 24,
    marginVertical: 0,
    fontWeight: '700',
    color: '#fff',
  },
  imgWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    resizeMode: 'contain',
  },
  pledeModalTitle: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 40,
  },
});

export default MakePledgeComponent;
