import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {APP_COLORS} from '../config/colors';
import AppText from '../components/AppText';
import AppModal from '../components/AppModal';
import AppDropdown from '../components/AppDropdown';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

const UsageScreen = () => {
  // const [usageMethod, setUsageMethod] = useState('');
  const [usageMethodValue, setUsageMethodValue] = useState('joint');
  const [consumage, setConsumage] = useState('0');
  const [gramsPer, setGramsPer] = useState('0');
  const [pricePerGram, setPricePerGram] = useState('0');
  const [usageData, setUsageData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const usageMethodItems = [
    {label: 'Joints', value: 'joint'},
    {label: 'Bowls', value: 'bowl'},
  ];

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('usageData')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot?.docs.map(doc => ({
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
      console.log(usageData, 'usage data---');
      return;
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

  let total_consumption_per_day = consumage * gramsPer;
  let cost_per_day = total_consumption_per_day * pricePerGram;
  let cost_per_gram = cost_per_day / total_consumption_per_day;
  cost_per_gram = isNaN(cost_per_gram) ? '--' : cost_per_gram;

  return (
    <View style={styles.container}>
      <AppText textType="heading" style={styles.title}>
        Please enter your cannabis usage info
      </AppText>

      <AppText onPress={() => setModalVisible(true)}>
        + Add Usage Method
      </AppText>

      <AppModal isVisible={modalVisible} setIsVisible={setModalVisible}>
        <AppText style={styles.modalHeading} textType="heading">
          Add Usage Method
        </AppText>
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
          <AppInput
            style={styles.input}
            placeholder={`${usageMethodValue} per day`}
            value={consumage}
            onChangeText={setConsumage}
          />
        </View>

        <View style={styles.smallInputWrap}>
          <AppText>Grams per {usageMethodValue}</AppText>
          <AppInput
            style={styles.smallInput}
            placeholder="Grams per Joint or Bowl"
            value={gramsPer}
            onChangeText={setGramsPer}
          />
        </View>

        <View style={styles.smallInputWrap}>
          <AppText>Price per gram</AppText>
          <AppInput
            style={styles.smallInput}
            placeholder="Price per Gram"
            value={pricePerGram}
            onChangeText={setPricePerGram}
          />
        </View>

        <View style={styles.smallInputWrap}>
          <AppText>Average cost per day</AppText>
          <AppInput
            readOnly
            value={cost_per_gram.toString()}
            style={styles.smallInput}
            placeholder="Price per Gram"
            // onChangeText={setPricePerGram}
          />
        </View>

        <AppButton
          style={styles.button}
          onPress={saveUsageData}
          title={'Add'}
        />
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
    // justifyContent: 'center',
    backgroundColor: APP_COLORS.background,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  modalHeading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
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
    fontFamily: 'GothamRounded-Light',
  },
  button: {
    marginTop: 20,
  },
  smallInputWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  smallInput: {
    width: 70,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    fontFamily: 'GothamRounded-Light',
  },
});

export default UsageScreen;
