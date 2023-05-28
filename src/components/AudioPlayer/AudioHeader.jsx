import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AppText from '../AppText';
import {IMAGES} from '../../config/images';

const AudioHeader = ({title, message}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{width: 30, height: 30, padding: 10}}
          source={IMAGES.BackArrowIcon}
        />
      </TouchableOpacity>
      <View>
        <AppText style={styles.message} onPress={() => navigation.goBack()}>
          {message}
        </AppText>
        <AppText
          textType="heading"
          style={styles.title}
          onPress={() => navigation.goBack()}>
          {title}
        </AppText>
      </View>
      <View style={{width: 40}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    marginBottom: 3,
    textTransform: 'uppercase',
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AudioHeader;
