import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  RefreshControl,
  Text,
  View,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import CustomTabs from '../../components/CustomTabs';
import AppButton from '../../components/AppButton';
import {IMAGES} from '../../config/images';
import QuestionModal from '../../components/QuestionModal';
import {groupByDate} from '../../functions';

const ReviewPledgeCard = ({item, index, navigation}) => {
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
            <AppText>
              I will{item.pledgeStatus == 'no' && ' not'} stay sober today
            </AppText>
          </View>

          <AppButton
            onPress={() =>
              navigation.navigate('PledgeScreen', {pledgeEditData: item})
            }
            style={styles.editBtn}
            title="Edit"
          />
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

const AnswerCard = ({item, index}) => {
  const [questionModal, setQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(item || {});
  const [answer, setAnswer] = useState(item.answer || '');

  const styles = StyleSheet.create({
    usageItem: {
      backgroundColor: APP_COLORS.itemBackground,
      borderRadius: 20,
      marginVertical: 15,
    },
    usageMethodText: {
      fontSize: 16,
      color: APP_COLORS.primaryText,
      textTransform: 'capitalize',
      fontWeight: 400,
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

  const editAnswer = () => {
    firestore()
      .collection('answeredQuestions')
      .doc(selectedQuestion.id)
      .update({
        answer,
      })
      .then(() => {
        setQuestionModal(false);
      })
      .catch(() => {
        setQuestionModal(false);
      });
  };

  return (
    <>
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
                {item.title}
              </AppText>
            </View>

            <AppButton
              onPress={() => {
                setSelectedQuestion(item);
                setQuestionModal(true);
              }}
              style={styles.editBtn}
              title="Edit"
            />
          </View>

          <View style={styles.contentContainerRow}>
            <AppText>{item.answer}</AppText>
          </View>
        </View>
        <View style={[styles.cut, {marginBottom: -8}]} />
      </View>
      <QuestionModal
        answer={answer}
        setAnswer={setAnswer}
        onPress={editAnswer}
        questionModal={questionModal}
        setQuestionModal={setQuestionModal}
        selectedQuestion={selectedQuestion}
      />
    </>
  );
};

export default function HistoryScreen({navigation}) {
  const [activeTab, setActiveTab] = useState(0);
  const [pledges, setPledges] = useState([]);
  const [answers, setAnswers] = useState([]);
  const userId = auth().currentUser.uid;

  useEffect(() => {
    const unsubscribe_1 = fetchReviewPledgeData();
    const unsubscribe_2 = fetchAnsweredQuestions();

    return () => {
      unsubscribe_1;
      unsubscribe_2;
    };
  }, []);

  const fetchReviewPledgeData = async () => {
    firestore()
      .collection('pledgesReview')
      .where('user', '==', userId)
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        const array = [];
        querySnapshot?.forEach(doc => {
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
        const groupedPledges = groupByDate(array);
        setRefreshing(false);
        setPledges(groupedPledges);
      })
      .catch(e => {
        console.log(e, 'error in fetchreviewpledgeData');
        setRefreshing(false);
      });
  };

  const fetchAnsweredQuestions = async () => {
    firestore()
      .collection('answeredQuestions')
      .where('user', '==', userId)
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        const array = [];
        querySnapshot?.forEach(doc => {
          array.push({
            id: doc.id,
            answer: doc.data().answer,
            question: doc.data().question,
            title: doc.data().title,
            date: moment(doc.data().date?.toDate()?.toISOString()).format(
              'DD-MM-YYYY',
            ),
          });
        });
        const groupedAnswers = groupByDate(array);
        setAnswers(groupedAnswers);
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (activeTab == 0) {
      fetchAnsweredQuestions();
    } else {
      fetchReviewPledgeData();
    }
  }, []);

  const renderReviewPledge = ({item, index}) => (
    <>
      <AppText style={styles.sectionHeader}>{item}</AppText>
      {pledges[item].map(pledge => (
        <ReviewPledgeCard navigation={navigation} item={pledge} index={index} />
      ))}
    </>
  );

  const renderAnswers = ({item, index}) => (
    <>
      <AppText style={styles.sectionHeader}>{item}</AppText>
      {answers[item].map(question => (
        <AnswerCard item={question} index={index} />
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.goBack()}>
            <Image
              style={{width: 25, height: 25, padding: 10, marginRight: 10}}
              source={IMAGES.BackArrowIcon}
            />
            <AppText textType="heading">History</AppText>
          </TouchableOpacity>
        </View>

        <CustomTabs
          tabValues={['Questions', 'Pledges']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </SafeAreaView>

      {activeTab === 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={'#fff'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{padding: 20}}
          data={Object.keys(answers)}
          renderItem={renderAnswers}
        />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={'#fff'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{padding: 20}}
          data={Object.keys(pledges)}
          renderItem={renderReviewPledge}
        />
      )}
      <View style={{height: 110}} />
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
