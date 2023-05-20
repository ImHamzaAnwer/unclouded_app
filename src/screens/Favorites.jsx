import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AppText from '../components/AppText';
import {APP_COLORS} from '../config/colors';
import {userId} from '../functions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMAGES} from '../config/images';

const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesRef = firestore().collection('favorites').doc(userId);
      const doc = await favoritesRef.get();

      if (doc.exists) {
        const favoritesData = doc.data();
        setFavorites(favoritesData.tracks);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const removeTrackFromFavorites = async track => {
    console.log(track, 'idd-d-d-d-');
    try {
      const favoritesRef = firestore().collection('favorites').doc(userId);

      // Remove the track from the favorites array
      await favoritesRef.update({
        tracks: firestore.FieldValue.arrayRemove(track),
      });

      // Reload the favorites list
      loadFavorites();
    } catch (error) {
      console.error('Error removing track from favorites:', error);
    }
  };

  const handleRemovePress = track => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this track from favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeTrackFromFavorites(track),
        },
      ],
    );
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let a = [item, ...favorites];
          let allTracks = [...new Set(a)];
          navigation.navigate('AudioScreenStack', {
            screen: 'AudioPlayer',
            params: {playlist: allTracks},
          });
        }}
        style={styles.row}>
        <View style={styles.subRow}>
          <Image source={{uri: item.albumArtUrl}} style={styles.img} />
          <View>
            <AppText style={styles.title}>{item.title}</AppText>
            <AppText style={styles.artist}>{item.artist}</AppText>
            {/* <AppText style={styles.artist}>Category: {item.category}</AppText> */}
          </View>
        </View>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => handleRemovePress(item)}>
          <Image style={styles.removeIcon} source={IMAGES.CloseIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: APP_COLORS.background,
      }}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.backIcon} source={IMAGES.BackArrowIcon} />
          <AppText onPress={() => navigation.goBack()} textType="heading">
            Favorites
          </AppText>
        </TouchableOpacity>
      </SafeAreaView>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <AppText>No favorites found.</AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 10,
    // backgroundColor: APP_COLORS.gray2,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.gray2,
    justifyContent: 'space-between',
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    marginVertical: 0,
    fontSize: 16,
    color: APP_COLORS.primaryText,
  },
  artist: {
    marginTop: 5,
    marginBottom: 0,
    fontSize: 14,
  },
  removeIcon: {
    width: 40,
    height: 40,
    tintColor: APP_COLORS.error,
  },
  backIcon: {
    marginRight: 10,
  },
});

export default Favorites;
