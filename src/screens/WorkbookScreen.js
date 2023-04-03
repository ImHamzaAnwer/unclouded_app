import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';

const Workbook = () => {
  const [pledgeStreak, setPledgeStreak] = useState(0);
  const [pledges, setPledges] = useState([]);
  const [answer, setAnswer] = useState('');
  const [isPledged, setIsPledged] = useState(false);

  const handleSubmit = (handledPledges, todayString) => {
    if (answer) {
      const pledge = {date: todayString, answer};
      setPledges([...pledges, pledge]);

      if (
        pledges.length === 0 ||
        todayString !== pledges[pledges.length - 1].date
      ) {
        // if it's the first pledge or if it's not the same day as the last pledge
        setPledgeStreak(pledgeStreak + 1);
      }
    }

    setIsPledged(true);
    setAnswer('');
  };

  const handlePledgePress = () => {
    const today = new Date();
    const todayString = today.toDateString();

    if (pledges.some(pledge => pledge.date === todayString)) {
      return; // don't add duplicate pledges
    }

    // Show a modal with a text input to get the user's pledge
    handleSubmit(pledges, todayString);
  };

  return (
    <>
      {isPledged ? (
        <Text>Pledged Alreay</Text>
      ) : (
        <View style={styles.modal}>
          <Text style={styles.modalHeading}>Pledge for Today</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={text => setAnswer(text)}
            value={answer}
            placeholder="What is your pledge for today?"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
            <Text style={styles.modalButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.heading}>Pledge Workbook</Text>
        <TouchableOpacity style={styles.button} onPress={handlePledgePress}>
          <Text style={styles.buttonText}>Pledge for Today</Text>
        </TouchableOpacity>
        <Text style={styles.subheading}>Pledge Streak: {pledgeStreak}</Text>
        <Text style={styles.subheading}>Pledges:</Text>
        {pledges.length === 0 && <Text>No pledges yet</Text>}
        {pledges.map((pledge, index) => (
          <Text key={index}>
            {pledge.date}: {pledge.answer}
          </Text>
        ))}
      </View>
    </>
  );
};

export default Workbook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    backgroundColor: '#efefef',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 22,
  },
  modalInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
