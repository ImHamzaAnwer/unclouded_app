import React, {useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import AppModal from './AppModal';
import AppText from './AppText';
import AppInput from './AppInput';
import AppButton from './AppButton';

const QuestionModal = ({
  onPress,
  selectedQuestion,
  questionModal,
  setQuestionModal,
  answer,
  setAnswer,
}) => {
  return (
    <AppModal
      imageModal
      isVisible={questionModal}
      setIsVisible={setQuestionModal}>
      <ImageBackground
        style={{paddingHorizontal: 25, paddingVertical: 30}}
        blurRadius={10}
        source={{uri: 'https://picsum.photos/300'}}>
        <AppText style={styles.modalQuestion} textType="heading">
          {selectedQuestion.question}
        </AppText>

        <AppInput
          maxLength={400}
          multiline
          value={answer}
          onChangeText={setAnswer}
        />

        <AppButton onPress={onPress} style={{marginTop: 40}} title="Done" />
      </ImageBackground>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  modalQuestion: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 20,
  },
});

export default QuestionModal;
