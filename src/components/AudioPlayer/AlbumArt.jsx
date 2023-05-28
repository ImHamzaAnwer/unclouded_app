import React from 'react';

import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {APP_COLORS} from '../../config/colors';
import AppText from '../AppText';
import {IMAGES} from '../../config/images';

const AlbumArt = ({track, title, artist, url, onPress, isFavorite}) => (
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
      <View>
        <AppText textType="heading" style={styles.title}>
          {title}
        </AppText>
        <AppText style={styles.artist}>{artist}</AppText>
      </View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <Image
          style={[styles.iconImage]}
          source={isFavorite ? IMAGES.FillFavoriteIcon : IMAGES.FavoriteIcon}
        />
      </TouchableOpacity>
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
  iconImage: {},
  trackDetailsContainer: {
    marginTop: 50,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
