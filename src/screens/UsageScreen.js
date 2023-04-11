import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  // Picker,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {APP_COLORS} from '../config/colors';
import AppText from '../components/AppText';
import AppModal from '../components/AppModal';
import AppDropdown from '../components/AppDropdown';
import AppButton from '../components/AppButton';

const UsageScreen = () => {
  // const [usageMethod, setUsageMethod] = useState('');
  const [consumage, setConsumage] = useState('');
  const [gramsPer, setGramsPer] = useState('');
  const [pricePerGram, setPricePerGram] = useState('');
  const [usageData, setUsageData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usageMethodOpen, setUsageMethodOpen] = useState(false);
  const [usageMethodValue, setUsageMethodValue] = useState(null);
  const [usageMethodItems, setUsageMethodItems] = useState([
    {label: 'Bowls', value: 'bowls'},
    {label: 'Joints', value: 'joints'},
  ]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('usageData')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsageData(data);
      });

    return unsubscribe;
  }, []);

  const saveUsageData = async () => {
    try {
      const usageData = {
        usageMethod: usageMethodValue,
        consumage,
        gramsPer,
        pricePerGram,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore().collection('usageData').add(usageData);

      setConsumage('');
      setGramsPer('');
      setPricePerGram('');

      alert('Usage data saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving usage data.');
    }
  };

  return (
    <View style={styles.container}>
      <AppText heading style={styles.title}>
        Please enter your cannabis usage info
      </AppText>

      <AppText onPress={() => setModalVisible(true)}>
        + Add Usage Method
      </AppText>

      <AppModal isVisible={modalVisible} setIsVisible={setModalVisible}>
        <AppText heading>Add Usage Method</AppText>
        <View style={styles.pickerContainer}>
          <AppText style={styles.label}>Usage Method:</AppText>
          <AppDropdown
            value={usageMethodValue}
            setValue={setUsageMethodValue}
            data={usageMethodItems}
          />
        </View>

        <View style={styles.pickerContainer}>
          <AppText style={styles.label}>Consumage per day:</AppText>
          <TextInput
            style={styles.input}
            placeholder="Grams per day"
            value={consumage}
            onChangeText={setConsumage}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Grams per Joint or Bowl"
          value={gramsPer}
          onChangeText={setGramsPer}
        />

        <TextInput
          style={styles.input}
          placeholder="Price per Gram"
          value={pricePerGram}
          onChangeText={setPricePerGram}
        />

        <AppButton onPress={saveUsageData} title={'Submit'} />
      </AppModal>

      <FlatList
        data={usageData}
        renderItem={({item}) => (
          <View style={styles.usageItem}>
            <Text style={styles.usageText}>{item.usageMethod}</Text>
            <Text style={styles.usageText}>{item.consumage}</Text>
            <Text style={styles.usageText}>{item.gramsPer}</Text>
            <Text style={styles.usageText}>{item.pricePerGram}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.usageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLORS.background,
    padding: 20,
  },
  title: {
    // fontSize: 24,
    // fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#0080ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'dodgerblue',
  },
});

export default UsageScreen;
