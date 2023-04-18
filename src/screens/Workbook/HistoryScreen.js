import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import CustomTabs from '../../components/CustomTabs';

export default function HistoryScreen({navigation}) {
  const [activeTab, setActiveTab] = useState(0);
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

  const renderPledge = ({item, index}) => (
    <View key={index} style={styles.pledge}>
      <AppText>{item.pledgeStatus}</AppText>
      <AppText>{item.challengeLevel}</AppText>
      <AppText>{item.feelings}</AppText>
      <AppText>{item.note}</AppText>
      <AppText>{item.date}</AppText>
      {item?.timeSpentWith?.length > 0 && (
        <View>
          {item?.timeSpentWith.map(x => {
            return <AppText>{x}</AppText>;
          })}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText textType="heading">History</AppText>
      </View>

      <CustomTabs
        tabValues={['Questions', 'Pledges']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <View style={{padding: 20}}>
        {activeTab === 0 ? (
          <AppText>Questionsss===</AppText>
        ) : (
          <FlatList
            data={pledges}
            renderItem={renderPledge}
            keyExtractor={(item, index) => index}
            style={styles.history}
          />
        )}
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
    borderWidth: 1,
    padding: 5,
  },
  history: {},
});
