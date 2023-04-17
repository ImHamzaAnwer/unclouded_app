import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from './AppText';
import moment from 'moment';
import {APP_COLORS} from '../config/colors';
import AppButton from './AppButton';
import {Image} from 'react-native-animatable';

const MakePledgeComponent = ({onPress}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.date}>{moment().format('DD-MM-YYYY')}</AppText>

      <Image style={styles.img} source={require('../assets/images/logo.png')} />
      <View style={styles.btnWrap}>
        <AppButton
          onPress={onPress}
          style={styles.btn}
          title="Make Today's Pledge"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    backgroundColor: APP_COLORS.itemBackground,
    margin: 15,
    borderRadius: 20,
  },
  btnWrap: {
    position: 'absolute',
    width: '85%',
    alignSelf: 'center',
    bottom: -25,
  },
  btn: {
    height: 56,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: APP_COLORS.background,
  },
  date: {
    position: 'absolute',
    right: 15,
    top: 5,
    fontSize: 13,
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default MakePledgeComponent;
