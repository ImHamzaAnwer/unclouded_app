import React from 'react';
// import { defaultString } from '../String/defaultStringValue';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {IMAGES} from '../../config/images';
import LinearGradient from 'react-native-linear-gradient';
import {APP_COLORS} from '../../config/colors';

const Controls = ({
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => (
  <View style={styles.container}>
    {/* <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
      <Image
        style={[
          {width: 15, height: 15},
          styles.secondaryControl,
          shuffleOn ? [] : styles.off,
        ]}
        source={IMAGES.logo}
      />
      <Text>Shuffle</Text>
    </TouchableOpacity> */}
    <TouchableOpacity onPress={onBack}>
      <Image
        resizeMode="contain"
        style={{width: 20, height: 20}}
        source={IMAGES.PreviousIcon}
      />
    </TouchableOpacity>
    <LinearGradient
      style={{padding: 18, borderRadius: 72 / 2}}
      colors={APP_COLORS.buttonGradient}>
      {!paused ? (
        <TouchableOpacity onPress={onPressPause}>
          <Image
            resizeMode="contain"
            style={{width: 25, height: 25}}
            source={IMAGES.PauseIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressPlay}>
          <Image
            resizeMode="contain"
            style={{width: 25, height: 25}}
            source={IMAGES.PlayIcon}
          />
        </TouchableOpacity>
      )}
    </LinearGradient>
    <TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
      <Image
        resizeMode="contain"
        style={[{width: 25, height: 25}, forwardDisabled && {opacity: 0.3}]}
        source={IMAGES.NextIcon}
      />
    </TouchableOpacity>
    {/* <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
      <Image
        style={[
          styles.secondaryControl,
          repeatOn ? [] : styles.off,
          {width: 15, height: 15},
        ]}
        source={IMAGES.logo}
      />

      <Text>repeat</Text>
    </TouchableOpacity> */}
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    width: '70%',
    alignSelf: 'center',
    marginTop: 15,
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.3,
  },
});
