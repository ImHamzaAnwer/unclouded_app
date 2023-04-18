import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import MakePledgeComponent from '../../components/MakePledgeComponent';
import CustomTabs from '../../components/CustomTabs';

const QUESTIONNAIRES = [];

export default function Workbook({navigation}) {
  const [pledgedToday, setPledgedToday] = useState(false);
  const [questionnaires, setQuestionnaires] = useState(QUESTIONNAIRES);

  useEffect(() => {
    checkIfPledgedToday();
  }, []);

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

  const checkIfPledgedToday = async () => {
    let data = await firestore()
      .collection('pledges')
      .where('user', '==', auth().currentUser.uid)
      .get();

    console.log(data.docs[0]._data, 'Darta-a-a-a-a-a-');
  };

  const renderQuestionnaires = ({item}) => (
    <View style={styles.pledge}>
      <Text>{item.pledgeStatus}</Text>
      <Text>{item.challengeLevel}</Text>
      <Text>{item.feelings}</Text>
      <Text>{item.note}</Text>
      <Text>{item.date}</Text>
      {item?.timeSpentWith?.length > 0 && (
        <View>
          {item?.timeSpentWith.map(x => {
            return <Text>{x}</Text>;
          })}
        </View>
      )}
    </View>
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
        onPress={() => navigation.navigate('PledgeScreen')}
      />

      <View style={{padding: 15}}>
        <AppText style={styles.questionnaireTitle}>Questionnaires</AppText>
        <FlatList
          data={questionnaires}
          renderItem={renderQuestionnaires}
          keyExtractor={item => item.id}
          style={styles.history}
        />
      </View>
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
  pledge: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 5,
  },
  history: {
    padding: 15,
  },
});
