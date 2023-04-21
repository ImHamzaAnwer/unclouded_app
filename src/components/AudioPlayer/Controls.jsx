import React from 'react';
// import { defaultString } from '../String/defaultStringValue';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { IMAGES } from '../../config/images';

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
    <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
      <Image
        style={[
          {width: 15, height: 15},
          styles.secondaryControl,
          shuffleOn ? [] : styles.off,
        ]}
        source={IMAGES.logo}
      />
      <Text>Shuffle</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onBack}>
      <Image
        style={{width: 20, height: 20}}
        source={IMAGES.logo}
      />

      <Text>back</Text>
    </TouchableOpacity>
    {!paused ? (
      <TouchableOpacity onPress={onPressPause}>
        <View style={styles.playButton}>
          <Image
            style={{width: 15, height: 15}}
            source={IMAGES.logo}
          />

          <Text>play</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onPressPlay}>
        <View style={styles.playButton}>
          <Image
            style={{width: 15, height: 15}}
            source={IMAGES.logo}
          />
        </View>
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
      <Image
        style={[{width: 15, height: 15}, forwardDisabled && {opacity: 0.3}]}
        source={IMAGES.logo}
      />

      <Text>forward</Text>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
      <Image
        style={[
          styles.secondaryControl,
          repeatOn ? [] : styles.off,
          {width: 15, height: 15},
        ]}
        source={IMAGES.logo}
      />

      <Text>repeat</Text>
    </TouchableOpacity>
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
  },
  playButton: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    borderWidth: 1,
    // borderColor: defaultString.darkColor,
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.3,
  },
});
