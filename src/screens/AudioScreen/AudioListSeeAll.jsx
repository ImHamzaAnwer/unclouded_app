import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import {IMAGES} from '../../config/images';
import {TRACKS} from '../../config/tracks';

const AudioCardSeeAll = ({tracks, selectedTrack, i, navigation}) => {
  return (
    <View key={i} style={styles.audioCardContainer}>
      <TouchableOpacity
        onPress={() => {
          let a = [selectedTrack, ...tracks];
          let allTracks = [...new Set(a)];
          navigation.navigate('AudioPlayer', {playlist: allTracks});
        }}
        activeOpacity={0.5}>
        <Image
          style={styles.cardImg}
          source={{
            uri: selectedTrack?.albumArtUrl,
          }}
        />
      </TouchableOpacity>

      <View style={styles.trackTitleContainer}>
        <AppText style={styles.trackTitle}>
          {selectedTrack?.title?.length > 20
            ? `${selectedTrack?.title.slice(0, 20)}...`
            : selectedTrack?.title}
        </AppText>
      </View>
    </View>
  );
};

const AudioListSeeAll = ({navigation, route}) => {
  const categoryName = route.params.category;
  const tracks = TRACKS.filter(track => track.category == categoryName);
  const [searchText, setSearchText] = useState('');

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.backIcon} source={IMAGES.BackArrowIcon} />
            <AppText
              style={{textTransform: 'capitalize'}}
              onPress={() => navigation.goBack()}
              textType="heading">
              {categoryName}
            </AppText>
          </TouchableOpacity>
          <View style={styles.searchBarContainer}>
            <Image style={styles.searchBarIcon} source={IMAGES.SearchIcon} />
            <TextInput
              value={searchText}
              onChange={setSearchText}
              placeholderTextColor={APP_COLORS.gray}
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
                <AudioCardSeeAll
                  navigation={navigation}
                  tracks={tracks}
                  selectedTrack={item}
                  i={i}
                />
              );
            })}
          </View>

          <View style={{height: 140}} />
        </View>
      </SafeAreaView>
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
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 7,
  },
  searchBarIcon: {
    width: 20,
    height: 20,
  },
  searchBarInput: {
    fontSize: 15,
    width: '85%',
    marginLeft: 10,
    padding: Platform.OS == 'ios' ? undefined : 0,
    height: Platform.OS == 'ios' ? 30 : undefined,
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
