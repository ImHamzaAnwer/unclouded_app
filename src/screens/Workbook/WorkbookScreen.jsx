import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

export default function PledgeScreen() {
  const [pledgeAmount, setPledgeAmount] = useState('');
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
        console.log('Total pledges: ', querySnapshot.size);
        const array = [];
        querySnapshot.forEach(doc => {
          array.push({
            id: doc.id,
            mood: doc.data().amount,
            date: moment(doc.data().date?.toDate()?.toISOString()).format(
              'DD-MM-YYYY',
            ),
          });
        });
        setPledges(array);
        console.log(pledges, 'arr00');
      });
  };

  const handlePledgePress = () => {
    // Save the pledge to Firestore
    firestore()
      .collection('pledges')
      .add({
        amount: pledgeAmount,
        date: firestore.FieldValue.serverTimestamp(),
        user: auth().currentUser.uid,
      })
      .then(() => {
        setPledgeAmount('');
      })
      .catch(error => {
        console.error('Error saving pledge: ', error);
      });
  };

  const renderPledge = ({item}) => (
    <View style={styles.pledge}>
      <Text>{item.amount}</Text>
      <Text>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Pledge</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter pledge amount"
        value={pledgeAmount}
        onChangeText={setPledgeAmount}
      />
      <Button title="Pledge" onPress={handlePledgePress} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  history: {
    width: '80%',
  },
});
