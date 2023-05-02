import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {APP_COLORS} from '../config/colors';
import AppText from '../components/AppText';
import AppModal from '../components/AppModal';
import AppDropdown from '../components/AppDropdown';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import CustomTabs from '../components/CustomTabs';
import moment from 'moment';
import {IMAGES} from '../config/images';

const UsageCard = ({item, handleEditUsageData}) => {
  const styles = StyleSheet.create({
    usageItem: {
      backgroundColor: APP_COLORS.itemBackground,
      borderRadius: 20,
      marginVertical: 15,
    },
    cut: {
      backgroundColor: APP_COLORS.background,
      width: 80,
      height: 15,
      borderRadius: 6,
      marginTop: -8,
      alignSelf: 'center',
      // transform: [{skewX: '45deg'}],
    },
    contentContainer: {
      paddingHorizontal: 10,
      marginVertical: 8,
    },
    contentContainerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 10,
      justifyContent: 'space-between',
    },
    text: {
      marginVertical: 0,
    },
    usageMethodText: {
      fontSize: 17,
      color: APP_COLORS.primaryText,
      textTransform: 'capitalize',
      fontWeight: 500,
    },
    usageMethodText2: {
      fontSize: 17,
      textAlign: 'center',
      color: APP_COLORS.primaryText,
      textTransform: 'capitalize',
      fontWeight: 500,
      marginBottom: 5,
    },
    editBtn: {
      width: 70,
      height: 35,
      borderRadius: 8,
    },
    totalAmountText: {
      fontSize: 17,
      color: APP_COLORS.primaryText,
      fontWeight: 500,
    },
    totalAmountText2: {
      color: APP_COLORS.primaryText,
      fontWeight: 200,
    },
  });

  return (
    <View style={styles.usageItem}>
      <View style={styles.cut} />
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.contentContainerRow,
            {borderBottomWidth: 0.5, borderBottomColor: APP_COLORS.gray},
          ]}>
          <AppText style={[styles.text, styles.usageMethodText]}>
            {item.usageMethod + 's'}
          </AppText>
          <View>
            <AppText style={[styles.text, styles.usageMethodText2]}>
              {item.consumage}
            </AppText>
            <View>
              <AppText style={[styles.text, styles.consumageText]}>
                {item.usageMethod + 's'}/day
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.contentContainerRow}>
          <AppText style={styles.totalAmountText}>
            $20 <AppText style={styles.totalAmountText2}>total amount</AppText>
          </AppText>

          <AppButton
            onPress={handleEditUsageData}
            style={styles.editBtn}
            title="Edit"
          />
        </View>
      </View>
      <View style={[styles.cut, {marginBottom: -8}]} />
    </View>
  );
};

const UsageScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [usageMethodValue, setUsageMethodValue] = useState('joint');
  const [consumage, setConsumage] = useState('0');
  const [gramsPer, setGramsPer] = useState('0');
  const [pricePerGram, setPricePerGram] = useState('0');
  const [usageData, setUsageData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const usageMethodItems = [
    {label: 'Joints', value: 'joint'},
    {label: 'Bowls', value: 'bowl'},
  ];

  const fetchUsageData = async () => {
    firestore()
      .collection('usageData')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const array = [];
        querySnapshot.forEach(doc => {
          array.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUsageData(array);
        if (array[0]?.quittingDate && array[0]?.usageMethod) {
          navigation.navigate('MainTabs');
        }
      });
  };

  useEffect(() => {
    const unsubscribe = fetchUsageData();

    return () => unsubscribe;
  }, []);

  const handleEditUsageData = () => {
    setConsumage(usageData[0].consumage);
    setGramsPer(usageData[0].gramsPer);
    setPricePerGram(usageData[0].pricePerGram);
    setModalVisible(true);
  };

  const saveUsageData = async fromCalendar => {
    try {
      const usageData = {
        usageMethod: usageMethodValue,
        consumage,
        gramsPer,
        pricePerGram,
        createdAt: firestore.FieldValue.serverTimestamp(),
        userId: auth().currentUser.uid,
        quittingDate: null,
      };

      fromCalendar
        ? await firestore()
            .collection('usageData')
            .doc(auth().currentUser.uid)
            .update({quittingDate: selectedDate || null})
        : await firestore()
            .collection('usageData')
            .doc(auth().currentUser.uid)
            .set(usageData);

      setModalVisible(false);
      setConsumage('');
      setGramsPer('');
      setPricePerGram('');
      Alert.alert(
        fromCalendar
          ? 'Quitting date saved successfully!'
          : 'Usage data saved successfully!',
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error saving usage data.');
    }
  };

  let total_consumption_per_day = consumage * gramsPer;
  let cost_per_day = total_consumption_per_day * pricePerGram;
  let cost_per_gram = cost_per_day / total_consumption_per_day;
  cost_per_gram = isNaN(cost_per_gram) ? '--' : cost_per_gram;

  return (
    <View style={styles.container}>
      <CustomTabs
        tabValues={['Step 1', 'Step 2']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 0 ? (
        <>
          <AppText textType="heading" style={styles.title}>
            Please enter your cannabis usage information
          </AppText>

          {!usageData.length && (
            <AppText
              style={styles.addUsageText}
              onPress={() => setModalVisible(true)}>
              + Add Usage Method
            </AppText>
          )}

          <FlatList
            data={usageData}
            renderItem={({item}) => (
              <UsageCard
                handleEditUsageData={handleEditUsageData}
                item={item}
              />
            )}
            keyExtractor={item => item.id}
            style={styles.usageList}
          />

          <AppButton title="Next" />
        </>
      ) : (
        <>
          <AppText style={styles.calendarTitle} textType="heading">
            Set quitting date
          </AppText>
          <View style={styles.calendarRow}>
            <View>
              <AppText>select date</AppText>
              <AppText style={styles.selectedDateText} textType="heading">
                {selectedDate}
              </AppText>
            </View>
            <Image style={styles.calendarIcon} source={IMAGES.logo} />
          </View>
          <Calendar
            hideExtraDays
            firstDay={1}
            style={{
              borderRadius: 10,
              marginVertical: 20,
              paddingTop: 10,
            }}
            theme={{
              backgroundColor: APP_COLORS.itemBackground,
              calendarBackground: APP_COLORS.itemBackground,
              dayTextColor: '#A8C0BC',
              textDisabledColor: APP_COLORS.gray,
              monthTextColor: APP_COLORS.primaryText,
              textMonthFontSize: 18,
              textMonthFontWeight: '500',
            }}
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            minDate={moment().format('YYYY-MM-DD')}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />

          <AppButton onPress={() => saveUsageData(true)} title="Next" />
        </>
      )}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: APP_COLORS.background,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginVertical: 40,
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
  addUsageText: {
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 500,
    color: APP_COLORS.aqua,
  },

  //calendar Screen
  calendarTitle: {
    textAlign: 'center',
    marginTop: 20,
  },
  selectedDateText: {
    marginVertical: 0,
    fontSize: 17,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    paddingBottom: 10,
    paddingRight: 5,
    borderBottomColor: APP_COLORS.gray,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
});

export default UsageScreen;
