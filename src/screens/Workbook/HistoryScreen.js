import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import CustomTabs from '../../components/CustomTabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppButton from '../../components/AppButton';

const ReviewPledgeCard = ({item, index}) => {
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
    contentContainerRowItem: {
      borderRightWidth: 0.2,
      borderColor: '#fff',
      width: '33%',
      alignItems: 'center',
    },
    text: {
      marginVertical: 0,
    },
    usageMethodText: {
      fontSize: 15,
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
    bottomRowText: {
      textTransform: 'capitalize',
      marginVertical: 0,
      fontSize: 17,
      color: APP_COLORS.primaryText,
      fontWeight: 500,
    },
    bottomRowText2: {
      color: APP_COLORS.primaryText,
      fontWeight: 200,
    },
  });

  return (
    <View key={index} style={styles.usageItem}>
      <View style={styles.cut} />
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.contentContainerRow,
            {borderBottomWidth: 0.5, borderBottomColor: APP_COLORS.gray},
          ]}>
          <View>
            <AppText style={[styles.text, styles.usageMethodText]}>
              Daily review of pledge
            </AppText>
            <AppText>I will stay sober today</AppText>
          </View>

          <AppButton onPress={() => {}} style={styles.editBtn} title="Edit" />
        </View>

        <View style={[styles.contentContainerRow, {paddingHorizontal: 0}]}>
          <View style={styles.contentContainerRowItem}>
            <AppText style={styles.bottomRowText}>
              {item.challengeLevel || '--'}
            </AppText>
            <AppText style={styles.bottomRowText2}>Diificulty</AppText>
          </View>
          <View style={styles.contentContainerRowItem}>
            <AppText style={styles.bottomRowText}>
              {item.feelings || '--'}
            </AppText>
            <AppText style={styles.bottomRowText2}>Mood</AppText>
          </View>
          <View style={[styles.contentContainerRowItem, {borderRightWidth: 0}]}>
            <AppText style={styles.bottomRowText}>
              {item.timeSpentWith[0] || '--'}
            </AppText>
            <AppText style={styles.bottomRowText2}>Activity</AppText>
          </View>
        </View>
      </View>
      <View style={[styles.cut, {marginBottom: -8}]} />
    </View>
  );
};

export default function HistoryScreen({navigation}) {
  const [activeTab, setActiveTab] = useState(0);
  const [pledges, setPledges] = useState([]);

  useEffect(() => {
    const subscribe = fetchReviewPledgeData();

    return () => subscribe;
  }, []);

  const fetchReviewPledgeData = async () => {
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

  const renderReviewPledge = ({item, index}) => (
    <ReviewPledgeCard item={item} index={index} />
    // <View key={index} style={styles.pledge}>
    //   <AppText>{item.pledgeStatus}</AppText>
    //   <AppText>{item.challengeLevel}</AppText>
    //   <AppText>{item.feelings}</AppText>
    //   <AppText>{item.note}</AppText>
    //   <AppText>{item.date}</AppText>
    //   {item?.timeSpentWith?.length > 0 && (
    //     <View>
    //       {item?.timeSpentWith.map(x => {
    //         return <AppText>{x}</AppText>;
    //       })}
    //     </View>
    // )}
    // </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppText textType="heading">History</AppText>
        </TouchableOpacity>
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
            renderItem={renderReviewPledge}
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
