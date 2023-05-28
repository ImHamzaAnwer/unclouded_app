import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Calendar} from 'react-native-calendars';
import {APP_COLORS} from '../config/colors';
import AppText from '../components/AppText';
import AppModal from '../components/AppModal';
import AppDropdown from '../components/AppDropdown';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import CustomTabs from '../components/CustomTabs';
import moment from 'moment';
import {IMAGES} from '../config/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchUsageData, formatCompactNumber} from '../functions';

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
            ${item?.averagePrice || ''}{' '}
            <AppText style={styles.totalAmountText2}>total amount</AppText>
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

const UsageScreen = ({navigation, route}) => {
  const {isEdit} = route?.params;
  console.log(isEdit, 'route------');
  const [activeTab, setActiveTab] = useState(0);
  const [usageMethodValue, setUsageMethodValue] = useState('joint');
  const [consumage, setConsumage] = useState();
  const [gramsPer, setGramsPer] = useState();
  const [pricePerGram, setPricePerGram] = useState();
  const [usageData, setUsageData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const usageMethodItems = [
    {label: 'Joints', value: 'joint'},
    {label: 'Bowls', value: 'bowl'},
  ];

  const handleUsageData = async () => {
    let array = await fetchUsageData();
    if (array[0]?.quittingDate && array[0]?.usageMethod && !isEdit) {
      navigation.navigate('MainTabs');
    } else {
      setUsageData(array);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleUsageData();
    });

    return unsubscribe;
  }, [isEdit]);

  const handleEditUsageData = () => {
    setConsumage(usageData[0].consumage);
    setGramsPer(usageData[0].gramsPer);
    setPricePerGram(usageData[0].pricePerGram);
    setModalVisible(true);
  };

  const saveUsageData = async fromCalendar => {
    if (
      (!consumage.length || !gramsPer.length || !pricePerGram.length) &&
      !fromCalendar
    ) {
      Alert.alert('All fields are required');
    } else {
      try {
        const _usageData = {
          usageMethod: usageMethodValue,
          consumage,
          gramsPer,
          pricePerGram,
          averagePrice: consumage * gramsPer * pricePerGram,
          createdAt: firestore.FieldValue.serverTimestamp(),
          userId: auth().currentUser.uid,
          quittingDate: usageData.length ? usageData[0]?.quittingDate : null,
        };

        fromCalendar
          ? await firestore()
              .collection('usageData')
              .doc(auth().currentUser.uid)
              .update({
                quittingDate: selectedDate || null,
              })
              .then(() => {
                handleUsageData();
              })
          : await firestore()
              .collection('usageData')
              .doc(auth().currentUser.uid)
              .set(_usageData)
              .then(() => {
                handleUsageData();
              });

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
        Alert.alert('Something went wrong, please try again.');
      }
    }
  };

  let total_consumption_per_day = consumage * gramsPer * pricePerGram;
  let av_cost_per_day = isNaN(total_consumption_per_day)
    ? '--'
    : total_consumption_per_day;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {isEdit && (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              style={{width: 25, height: 25, marginBottom: 20}}
              source={IMAGES.BackArrowIcon}
            />
          </TouchableOpacity>
        )}
        <CustomTabs
          tabValues={['Step 1', 'Step 2']}
          activeTab={activeTab}
          setActiveTab={s => {
            usageData.length
              ? setActiveTab(s)
              : Alert.alert('please add usage method first');
          }}
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

            {/* <AppButton  title="Next" /> */}
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
              <Image style={styles.calendarIcon} source={IMAGES.CalendarIcon} />
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
                [usageData[0].quittingDate]: {
                  selected: true,
                  selectedColor: APP_COLORS.aqua,
                  disableTouchEvent: true,
                },
                [selectedDate]: {
                  selected: true,
                  selectedColor: 'transparent',
                  selectedTextColor: APP_COLORS.aqua,
                  disableTouchEvent: true,
                },
              }}
            />

            <AppButton onPress={() => saveUsageData(true)} title="Next" />
          </>
        )}
      </SafeAreaView>

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
            maxLength={3}
            keyboardType="numeric"
            style={styles.input}
            // placeholder={`${usageMethodValue} per day`}
            value={consumage}
            placeholder="0"
            onChangeText={setConsumage}
          />
        </View>

        <View style={styles.smallInputWrap}>
          <AppText>Grams per {usageMethodValue}</AppText>
          <AppInput
            maxLength={3}
            keyboardType="numeric"
            containerStyle={{borderBottomWidth: 0}}
            style={styles.smallInput}
            // placeholder="Grams per Joint or Bowl"
            value={gramsPer}
            placeholder="0"
            onChangeText={setGramsPer}
          />
        </View>

        <View style={styles.smallInputWrap}>
          <AppText>Price per gram</AppText>
          <AppInput
            maxLength={3}
            keyboardType="numeric"
            containerStyle={{borderBottomWidth: 0}}
            style={styles.smallInput}
            value={pricePerGram}
            placeholder="0"
            onChangeText={setPricePerGram}
          />
        </View>

        <View style={styles.smallInputWrap}>
          <AppText>Average cost per day</AppText>
          <AppInput
            containerStyle={{borderBottomWidth: 0}}
            readOnly
            value={formatCompactNumber(av_cost_per_day)}
            style={styles.smallInput}
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
    borderColor: APP_COLORS.gray,
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
    marginVertical: 30,
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
    width: 22,
    height: 22,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
});

export default UsageScreen;
