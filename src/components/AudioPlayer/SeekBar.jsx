import React from 'react';

// import {defaultString} from '../String/defaultStringValue';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import {APP_COLORS} from '../../config/colors';
import AppText from '../AppText';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = position => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
];

const SeekBar = ({trackLength, currentPosition, onSeek, onSlidingStart}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={styles.container}>
      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        thumbTintColor={APP_COLORS.secondaryText}
        minimumTrackTintColor={APP_COLORS.secondaryText}
        maximumTrackTintColor={APP_COLORS.thirdColor}
      />
      <View style={{flexDirection: 'row'}}>
        <AppText style={styles.text}>{elapsed[0] + ':' + elapsed[1]}</AppText>
        <View style={{flex: 1}} />
        <AppText style={styles.text}>
          {trackLength > 1 && '-' + remaining[0] + ':' + remaining[1]}
        </AppText>
      </View>
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'dodgerblue',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 13,
    marginBottom: 0,
    textAlign: 'center',
  },
});
