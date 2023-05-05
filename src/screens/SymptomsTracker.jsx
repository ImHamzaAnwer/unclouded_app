import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {APP_COLORS} from '../config/colors';
import AppText from '../components/AppText';

function SymptomsCountdown(props) {
  const daysWithoutSmoking = props.daysWithoutSmoking;

  const symptoms = [
    {
      name: 'Coughing',
      duration: 21,
    },
    {
      name: 'Shortness of breath',
      duration: 2,
    },
    {
      name: 'Fatigue',
      duration: 7,
    },
    {
      name: 'Headaches',
      duration: 2,
    },
    {
      name: 'Irritability',
      duration: 4,
    },
  ];

  const symptomsWithDaysLeft = symptoms.map(symptom => {
    const daysLeft = symptom.duration - daysWithoutSmoking;

    return {
      ...symptom,
      daysLeft,
    };
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: APP_COLORS.background,
        justifyContent: 'center',
      }}>
      <AppText textType="heading">SYMPTOMS SCREEN HERE</AppText>
      {/* <Text>Symptoms Countdown</Text>
      <View>
        {symptomsWithDaysLeft.map(symptom => (
          <Text key={symptom.name}>
            <Text>{symptom.name}</Text> -{' '}
            {symptom.daysLeft > 0 ? `${symptom.daysLeft} days left` : 'Gone!'}
          </Text>
        ))}
      </View> */}
    </ScrollView>
  );
}

export default SymptomsCountdown;
