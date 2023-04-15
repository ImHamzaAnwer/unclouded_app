import React from 'react';
import {View, Text} from 'react-native';

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
    <View>
      <Text>Symptoms Countdown</Text>
      <View>
        {symptomsWithDaysLeft.map(symptom => (
          <Text key={symptom.name}>
            <Text>{symptom.name}</Text> -{' '}
            {symptom.daysLeft > 0 ? `${symptom.daysLeft} days left` : 'Gone!'}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default SymptomsCountdown;
