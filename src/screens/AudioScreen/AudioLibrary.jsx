import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';
import {IMAGES} from '../../config/images';
import {TRACKS} from '../../config/tracks';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AudioLibrary = ({navigation}) => {
  const [query, setQuery] = useState('');

  let categories = [...new Set(TRACKS.map(track => track.category))]; // get unique categories

  const filteredTracks = TRACKS.filter(track => {
    const titleMatches = track.title
      .toLowerCase()
      .includes(query?.toLowerCase());
    const artistMatches = track.artist
      .toLowerCase()
      .includes(query?.toLowerCase());
    return titleMatches || artistMatches;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <AppText textType="heading">Audio List</AppText>
        <View style={styles.searchBarContainer}>
          <Image style={styles.searchBarIcon} source={IMAGES.logo} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholderTextColor={'#546260'}
            placeholder="search audio track"
            style={styles.searchBarInput}
          />
        </View>
      </View>

      <View>
        {query ? (
          <View style={{padding: 15}}>
            <AppText textType="heading" style={styles.searchResultTitle}>
              Search Results
            </AppText>
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredTracks.map((track, index) => (
                <View key={index} style={{width: '100%', marginVertical: 20}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AudioPlayer', {track})}>
                    <Image
                      style={[styles.cardImg, {width: '100%'}]}
                      source={{
                        uri: 'https://picsum.photos/240/140',
                      }}
                    />
                  </TouchableOpacity>
                  <View style={styles.trackTitleContainer}>
                    <AppText style={styles.trackTitle} key={track.title}>
                      {track?.title?.length > 20
                        ? `${track.title.slice(0, 20)}...`
                        : track.title}
                    </AppText>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          categories.map(category => (
            <View style={styles.libraryCardContainer} key={category}>
              <View style={styles.row}>
                <AppText
                  style={{textTransform: 'capitalize'}}
                  textType="heading">
                  {category}
                </AppText>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AudioListSeeAll', {category})
                  }>
                  <AppText>{'see all >'}</AppText>
                </TouchableOpacity>
              </View>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {TRACKS.filter(track => track.category === category).map(
                  (track, index) => (
                    <View
                      key={index}
                      style={{
                        marginLeft: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AudioPlayer', {track})
                        }>
                        <Image
                          style={styles.cardImg}
                          source={{
                            uri: 'https://picsum.photos/240/140',
                          }}
                        />
                      </TouchableOpacity>

                      <View style={styles.trackTitleContainer}>
                        <AppText style={styles.trackTitle} key={track.title}>
                          {track?.title?.length > 20
                            ? `${track.title.slice(0, 20)}...`
                            : track.title}
                        </AppText>
                      </View>
                    </View>
                  ),
                )}
              </ScrollView>
            </View>
          ))
        )}
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
    width: 260,
    height: 140,
  },
  trackTitleContainer: {
    backgroundColor: APP_COLORS.itemBackground,
    // bottom: -20,
    // position: 'absolute',
    borderRadius: 120,
    marginTop: -20,
    paddingVertical: 5,
    borderWidth: 6,
    borderColor: APP_COLORS.background,
    maxWidth: '85%',
    width: '85%',
    alignSelf: 'center',
  },
  trackTitle: {
    textAlign: 'center',
    fontWeight: 500,
  },

  trackContainerForSearch: {},
});
export default AudioLibrary;
