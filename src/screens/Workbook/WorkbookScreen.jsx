import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import MakePledgeComponent from '../../components/MakePledgeComponent';
import {QUESTIONNAIRE} from '../../config/questionnaire';
import AppModal from '../../components/AppModal';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import moment from 'moment';

export default function Workbook({navigation}) {
  const [pledgedModal, setPledgeModal] = useState(false);
  const [pledgedToday, setPledgedToday] = useState(false);
  const [questionnaires, setQuestionnaires] = useState(QUESTIONNAIRE);
  const [note, setNote] = useState('');
  // const randomBool = useMemo(() => Math.random() < 0.5, []);
  const today = moment().format('YYYY-MM-DD');
  const uid = auth().currentUser.uid;
  useEffect(() => {
    const unsubscribe = checkIfPledgedToday();

    return () => unsubscribe;
  }, [pledgeToday]);

  const pledgeToday = () => {
    firestore().collection('dailyPledges').add({
      pledged: true,
      date: today,
      userId: uid,
      note,
      createdAt: firebase.firestore.Timestamp.now(),
      // const createdAt = firebase.firestore.Timestamp.now().toDate();
      // const timeAgo = moment(createdAt).fromNow();
    });
    setPledgedToday(true);
    setPledgeModal(false);
  };

  const checkIfPledgedToday = () => {
    firestore()
      .collection('dailyPledges')
      .where('userId', '==', uid)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data(), 'yoaoaoa');
          if (doc.exists && doc.data().pledged && doc.data().date === today) {
            setPledgedToday(true);
            setPledgeModal(false);
          } else {
            setPledgedToday(false);
          }
        });
      });
  };

  // const fetchPledgeData = async () => {
  //   firestore()
  //     .collection('pledges')
  //     .where('user', '==', auth().currentUser.uid)
  //     .orderBy('date', 'desc')
  //     .onSnapshot(querySnapshot => {
  //       const array = [];
  //       querySnapshot.forEach(doc => {
  //         array.push({
  //           id: doc.id,
  //           pledgeStatus: doc.data().pledgeStatus,
  //           challengeLevel: doc.data().challengeLevel,
  //           feelings: doc.data().feelings,
  //           note: doc.data().note,
  //           timeSpentWith: doc.data().timeSpentWith,
  //           date: moment(doc.data().date?.toDate()?.toISOString()).format(
  //             'DD-MM-YYYY',
  //           ),
  //         });
  //       });
  //       setPledges(array);
  //       console.log(pledges, 'arr00');
  //     });
  // };

  const QuestionCard = ({item, i}) => {
    const [showQuestion, setShowQuestion] = useState(false);

    const handleDoubleTap = () => {
      setShowQuestion(!showQuestion);
    };

    return (
      <TouchableOpacity
        key={i}
        onPress={handleDoubleTap}
        style={[styles.questionCard, {height: i % 2 === 0 ? 250 : 250}]}>
        <ImageBackground
          blurRadius={showQuestion ? 8 : 0}
          source={{uri: item.imageUri}}
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            // height: randomBool ? 230 : 250,
          }}
          resizeMode="cover">
          {!showQuestion ? (
            <AppText
              style={{
                paddingHorizontal: 5,
                position: 'absolute',
                bottom: 5,
                alignSelf: 'center',
                fontSize: 16,
              }}
              textType="heading">
              {item.title}
            </AppText>
          ) : (
            <View
              style={{
                padding: 10,
              }}>
              <AppText
                style={{fontSize: 16, textAlign: 'center'}}
                textType="heading">
                {item.title}
              </AppText>
              <AppText
                style={{color: '#fff', textAlign: 'center', fontSize: 15}}>
                {item.question}
              </AppText>
              <TouchableOpacity>
                <AppText
                  style={{color: '#fff', textAlign: 'center', fontSize: 15}}>
                  GO
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderQuestionnaires = ({item, i}) => (
    <QuestionCard item={item} i={i} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText textType="heading" style={styles.title}>
          Workbook
        </AppText>
        <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')}>
          <AppText>History</AppText>
        </TouchableOpacity>
      </View>

      <MakePledgeComponent
        pledgedToday={pledgedToday}
        onPress={() =>
          pledgedToday
            ? navigation.navigate('PledgeScreen')
            : setPledgeModal(true)
        }
      />

      <View style={{padding: 15, flex: 1}}>
        <AppText style={styles.questionnaireTitle}>Questionnaires</AppText>
        <FlatList
          style={{marginBottom: 100}}
          data={questionnaires}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderQuestionnaires}
        />
      </View>

      <AppModal isVisible={pledgedModal} setIsVisible={setPledgeModal}>
        <AppText style={styles.pledeModalTitle} textType="heading">
          Today, I will not smoke
        </AppText>
        <AppText>I’m doing this because...</AppText>
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
