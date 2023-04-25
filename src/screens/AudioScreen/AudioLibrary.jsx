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
  const categories = [...new Set(TRACKS.map(track => track.category))]; // get unique categories
  const [searchText, setSearchText] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <AppText
          onPress={() => navigation.navigate('AudioPlayer')}
          textType="heading">
          Audio Library
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
        {categories.map(category => (
          <View style={styles.libraryCardContainer} key={category}>
            <View style={styles.row}>
              <AppText textType="heading">{category}</AppText>
              <TouchableOpacity>
                <AppText>{'see all >'}</AppText>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal>
              {TRACKS.filter(track => track.category === category).map(
                track => (
                  <View
                    style={{
                      marginLeft: 20,
                      backgroundColor: 'blue',
                    }}>
                    <Image
                      style={styles.cardImg}
                      source={{
                        uri: 'https://picsum.photos/240/140',
                      }}
                    />
                    <TouchableOpacity>
                      <View style={styles.trackTitleContainer}>
                        <AppText style={styles.trackTitle} key={track.title}>
                          {track.title}
                        </AppText>
                      </View>
                    </TouchableOpacity>
                  </View>
                ),
              )}
            </ScrollView>
          </View>
        ))}
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
    width: 240,
    height: 140,
  },
  trackTitleContainer: {
    backgroundColor: 'pink',
    bottom: -20,
    position: 'absolute',
    borderRadius: 20,
    alignSelf: 'center',
  },
  trackTitle: {
    color: 'black',
    fontWeight: 500,
  },
});
export default AudioLibrary;
