import React from 'react';
import {StyleSheet, Touchable, View} from 'react-native';
import AppText from './AppText';
import moment from 'moment';
import {APP_COLORS} from '../config/colors';
import AppButton from './AppButton';
import {Image} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { IMAGES } from '../config/images';

const MakePledgeComponent = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnWrap}>
        <AppText style={styles.date}>{moment().format('DD, MMM YYYY')}</AppText>
        <AppText>make your pledge today</AppText>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <AppText style={styles.btnText}>Make Today's Pledge</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          source={IMAGES.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // height: 140,
    backgroundColor: APP_COLORS.pledgeCardColor,
    margin: 15,
    borderRadius: 20,
  },
  btnWrap: {
    paddingVertical: 20,
    paddingLeft: 15,
    width: '65%',
    // alignSelf: 'center',
  },
  btn: {
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
    borderRadius: 20,
    backgroundColor: APP_COLORS.primaryText,
  },
  btnText: {
    padding: 10,
    color: APP_COLORS.background,
    marginVertical: 0,
  },
  date: {
    fontSize: 24,
    marginVertical: 0,
  },
  imgWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default MakePledgeComponent;
