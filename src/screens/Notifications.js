import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {APP_COLORS} from '../config/colors';
import AppText from '../components/AppText';

function Notifiactions(props) {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: APP_COLORS.background,
        justifyContent: 'center',
      }}>
      <AppText textType="heading">NOTIFICATION SCREEN HERE</AppText>
    </ScrollView>
  );
}

export default Notifiactions;
