import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';

export default function HistoryScreen({navigation}) {
  const [pledges, setPledges] = useState([]);

  useEffect(() => {
    const subscribe = fetchPledgeData();

    return () => subscribe;
  }, []);

  const fetchPledgeData = async () => {
    firestore()
      .collection('pledges')
      .where('user', '==', auth().currentUser.uid)
      .orderBy('date', 'desc')
      .onSnapshot(querySnapshot => {
        const array = [];
        querySnapshot.forEach(doc => {
          array.push({
            id: doc.id,
            pledgeStatus: doc.data().pledgeStatus,
            challengeLevel: doc.data().challengeLevel,
            feelings: doc.data().feelings,
            note: doc.data().note,
            timeSpentWith: doc.data().timeSpentWith,
            date: moment(doc.data().date?.toDate()?.toISOString()).format(
              'DD-MM-YYYY',
            ),
          });
        });
        setPledges(array);
        console.log(pledges, 'arr00');
      });
  };

  const renderPledge = ({item}) => (
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
        <AppText>History</AppText>
      </View>

      <Text style={styles.historyTitle}>Pledge History</Text>
      <FlatList
        data={pledges}
        renderItem={renderPledge}
        keyExtractor={item => item.id}
        style={styles.history}
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pledge: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 5,
  },
  history: {
    width: '80%',
  },
});
