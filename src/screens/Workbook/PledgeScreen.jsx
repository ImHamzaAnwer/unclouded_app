import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {RadioButton, Checkbox} from 'react-native-paper';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import AppDropdown from '../../components/AppDropdown';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const PledgeScreen = ({navigation}) => {
  const [pledgeStatus, setPledgeStatus] = useState('yes');
  const [pledgeNote, setPledgeNote] = useState('');
  const [challengeLevel, setChallengeLevel] = useState('good');
  const [feelings, setFeelings] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handlePledgeStatusChange = value => {
    setPledgeStatus(value);
  };

  const handleChallengeLevelChange = value => {
    setChallengeLevel(value);
  };

  const handleFeelingsChange = value => {
    setFeelings(value);
  };
  const handlePledgeNote = value => {
    setPledgeNote(value);
  };

  const savePledge = async () => {
    firestore()
      .collection('pledges')
      .add({
        pledgeStatus,
        challengeLevel,
        feelings,
        timeSpentWith: selectedItems,
        note: pledgeNote,
        date: firestore.FieldValue.serverTimestamp(),
        user: auth().currentUser.uid,
      })
      .then(() => {
        setFeelings('');
        setPledgeNote('');
        setSelectedItems([]);
      })
      .catch(() => {});
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AppText textType="heading" style={styles.heading}>
          Pledge Review
        </AppText>
      </TouchableOpacity>

      <AppText style={styles.label}>
        Have you stayed true to your pledge today?
      </AppText>

      <RadioButton.Group
        onValueChange={handlePledgeStatusChange}
        value={pledgeStatus}>
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              color={APP_COLORS.primaryText}
              style={styles.radioCirle}
              value="yes"
            />
            <AppText style={styles.radioLabel}>Yes</AppText>
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android
              // uncheckedColor={APP_COLORS.primaryText}
              color={APP_COLORS.primaryText}
              style={styles.radioCirle}
              value="no"
            />
            <AppText style={styles.radioLabel}>No</AppText>
          </View>
        </View>
      </RadioButton.Group>

      <AppText style={styles.label}>How challenging was it today?</AppText>
      <AppDropdown
        data={[
          {label: 'Bad', value: 'bad'},
          {label: 'Good', value: 'good'},
        ]}
        value={challengeLevel}
        style={styles.dropdown}
        setValue={handleChallengeLevelChange}
      />

      <AppText style={styles.label}>How did you feel?</AppText>
      <AppInput
        style={styles.input}
        value={feelings}
        onChangeText={handleFeelingsChange}
        placeholder="Enter your feelings"
      />

      <AppText style={styles.label}>How did you spend your time today?</AppText>

      <MultiSelectDropdown
        data={[
          {label: 'Friends', value: 'friends'},
          {label: 'Family', value: 'family'},
        ]}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />

      <AppText style={styles.label}>Note</AppText>
      <AppInput
        style={styles.input}
        value={pledgeNote}
        onChangeText={handlePledgeNote}
      />

      <AppButton title="Save" style={styles.button} onPress={savePledge} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: APP_COLORS.background,
  },
  radioButtonContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCirle: {
    borderWidth: 0.5,
  },
  button: {
    marginVertical: 40,
  },
  label: {
    marginTop: 30,
    fontSize: 15,
  },
  heading: {
    fontSize: 24,
  },
});

export default PledgeScreen;
