import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import MakePledgeComponent from '../../components/MakePledgeComponent';
import {QUESTIONNAIRE} from '../../config/questionnaire';
import {IMAGES} from '../../config/images';
import AppModal from '../../components/AppModal';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import QuestionModal from '../../components/QuestionModal';

export default function Workbook({navigation}) {
  const [questionModal, setQuestionModal] = useState(false);
  const [questionnaires, setQuestionnaires] = useState(QUESTIONNAIRE);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const QuestionCard = ({item, i}) => {
    const [showQuestion, setShowQuestion] = useState(false);

    const handleDoubleTap = () => {
      setShowQuestion(!showQuestion);
    };

    return (
      <TouchableOpacity
        key={i}
        onPress={handleDoubleTap}
        style={[styles.questionCard, {height: i % 2 === 0 ? 250 : 250}]}>
        <ImageBackground
          blurRadius={showQuestion ? 8 : 0}
          source={{uri: item.imageUri}}
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            // height: randomBool ? 230 : 250,
          }}
          resizeMode="cover">
          {!showQuestion ? (
            <AppText
              style={{
                paddingHorizontal: 5,
                position: 'absolute',
                bottom: 5,
                alignSelf: 'center',
                fontSize: 16,
              }}
              textType="heading">
              {item.title}
            </AppText>
          ) : (
            <View
              style={{
                padding: 10,
              }}>
              <AppText
                style={{fontSize: 16, textAlign: 'center'}}
                textType="heading">
                {item.title}
              </AppText>
              <AppText
                style={{color: '#fff', textAlign: 'center', fontSize: 15}}>
                {item.question}
              </AppText>
              <TouchableOpacity
                onPress={() => {
                  setSelectedQuestion(item);
                  setQuestionModal(true);
                }}
                activeOpacity={0.5}
                style={styles.arrowIconWrap}>
                <Image
                  style={{width: 25, height: 25}}
                  source={IMAGES.ArrowIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderQuestionnaires = ({item, i}) => (
    <QuestionCard item={item} i={i} />
  );

  const saveAnswer = async () => {
    if (answer.length) {
      let obj = {
        title: selectedQuestion.title,
        question: selectedQuestion.question,
        answer: answer,
        date: firestore.FieldValue.serverTimestamp(),
        user: auth().currentUser.uid,
      };
      firestore()
        .collection('answeredQuestions')
        .add(obj)
        .then(doc => {
          firestore()
            .collection('answeredQuestions')
            .doc(doc.id)
            .update({
              ...obj,
              docId: doc.id,
            });
          setQuestionModal(false);
          setAnswer('');
        })
        .catch(() => {
          setQuestionModal(false);
          setAnswer('');
        });
    } else {
      Alert.alert('please write answer');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText textType="heading" style={styles.title}>
          Workbook
        </AppText>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.navigate('HistoryScreen')}>
          <Image
            style={{width: 20, height: 20, marginRight: 7}}
            source={IMAGES.HistoryIcon}
          />
          <AppText style={{marginVertical: 0, color: '#fff'}}>History</AppText>
        </TouchableOpacity>
      </View>

      <MakePledgeComponent />

      <View style={{padding: 15, flex: 1}}>
        <AppText style={styles.questionnaireTitle}>Questionnaires</AppText>
        <FlatList
          style={{marginBottom: 100}}
          data={questionnaires}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderQuestionnaires}
        />
      </View>

      <QuestionModal
        answer={answer}
        setAnswer={setAnswer}
        onPress={saveAnswer}
        questionModal={questionModal}
        setQuestionModal={setQuestionModal}
        selectedQuestion={selectedQuestion}
      />
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
  questionnaireTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  questionCard: {
    marginTop: 20,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 7,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },

  pledeModalTitle: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 40,
  },

  arrowIconWrap: {
    alignSelf: 'center',
    borderRadius: 60,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
