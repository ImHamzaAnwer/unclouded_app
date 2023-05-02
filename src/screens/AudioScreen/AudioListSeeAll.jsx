import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import {IMAGES} from '../../config/images';
import {TRACKS} from '../../config/tracks';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const AudioCardSeeAll = ({track, i, navigation}) => {
  return (
    <View key={i} style={styles.audioCardContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AudioPlayer', {track})}
        activeOpacity={0.5}>
        <Image
          style={styles.cardImg}
          source={{
            uri: track?.albumArtUrl,
          }}
        />
      </TouchableOpacity>

      <View style={styles.trackTitleContainer}>
        <AppText style={styles.trackTitle}>
          {track?.title?.length > 20
            ? `${track?.title.slice(0, 20)}...`
            : track?.title}
        </AppText>
      </View>
    </View>
  );
};

const AudioListSeeAll = ({navigation, route}) => {
  const categoryName = route.params.category;
  const tracks = TRACKS.filter(track => track.category == categoryName);
  const [searchText, setSearchText] = useState('');
  console.log(tracks, 'tracks-s-');

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <AppText
          style={{textTransform: 'capitalize'}}
          onPress={() => navigation.goBack()}
          textType="heading">
          {categoryName}
        </AppText>
        <View style={styles.searchBarContainer}>
          <Image style={styles.searchBarIcon} source={IMAGES.logo} />
          <TextInput
            value={searchText}
            onChange={setSearchText}
            placeholderTextColor={'#546260'}
            placeholder="search audio track"
            style={styles.searchBarInput}
          />
        </View>
      </View>

      <View>
        <View
          style={{
            padding: 15,
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
          }}>
          {tracks.map((item, i) => {
            return (
              <AudioCardSeeAll navigation={navigation} track={item} i={i} />
            );
          })}
        </View>

        <View style={{height: 140}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 20,
    borderRadius: 100,
  },
  forgotPassText: {
    textAlign: 'right',
  },
  noAccountText: {
    textAlign: 'center',
  },
  authBtn: {
    alignSelf: 'center',
    marginTop: 50,
  },
  textInputContainer: {
    marginTop: 40,
    marginHorizontal: 40,
  },
  roundedTextInput: {
    borderRadius: 50,
    borderWidth: 3,
    // borderColor: APP_COLORS.primary,
    backgroundColor: APP_COLORS.thirdColor,
  },
  searchBarContainer: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_COLORS.itemBackground,
    borderRadius: 30,
  },
  searchBarIcon: {
    width: 20,
    height: 20,
  },
  searchBarInput: {
    fontSize: 15,
    width: '85%',
    marginLeft: 10,
    height: 30,
    fontFamily: 'GothamRounded-Medium',
    color: APP_COLORS.primaryText,
    // backgroundColor: 'orange'
  },

  //card
  libraryCardContainer: {
    marginVertical: 15,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImg: {
    borderRadius: 20,
    resizeMode: 'cover',
    width: '100%',
    height: Dimensions.get('window').height / 4.5,
  },
  trackTitleContainer: {
    position: 'absolute',
    left: 5,
    color: '#fff',
    paddingVertical: 5,
    maxWidth: '85%',
    width: '85%',
  },
  trackTitle: {
    textAlign: 'center',
    fontWeight: 500,
  },

  audioCardContainer: {
    marginTop: 20,
    borderRadius: 20,
    marginHorizontal: 7,
    backgroundColor: 'white',
    borderRadius: 15,
    width: '45%',
    overflow: 'hidden',
  },
});
export default AudioListSeeAll;