import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {APP_COLORS} from '../../config/colors';
import AppText from '../AppText';

const AlbumArt = ({title, artist, url, onPress}) => (
  <>
    <View style={styles.container}>
      <View
        style={[
          styles.image,
          {
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: APP_COLORS.itemBackground,
          },
        ]}>
        <Image style={[styles.image]} source={{uri: url}} />
      </View>
    </View>

    <View style={styles.trackDetailsContainer}>
      <AppText textType="heading" style={styles.title}>
        {title}
      </AppText>
      <AppText style={styles.artist}>{artist}</AppText>
    </View>
  </>
);

export default AlbumArt;

const {width, height} = Dimensions.get('window');
const imageSize = width - 100;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    resizeMode: 'cover',
    width: imageSize,
    height: imageSize,
  },
  trackDetailsContainer: {
    marginTop: 50,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 0,
  },
  artist: {
    marginBottom: 0,
    fontSize: 13,
  },
});
