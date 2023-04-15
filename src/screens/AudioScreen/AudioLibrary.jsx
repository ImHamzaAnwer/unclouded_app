import React, {useState} from 'react';
import {StyleSheet, ScrollView, Image, View, TextInput} from 'react-native';
import {APP_COLORS} from '../../config/colors';
import AppText from '../../components/AppText';

const AudioLibrary = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  return (
    <ScrollView style={styles.container}>
      <AppText
        onPress={() => navigation.navigate('AudioPlayer')}
        textType="heading">
        Audio Library
      </AppText>

      <View style={styles.searchBarContainer}>
        <Image
          style={styles.searchBarIcon}
          source={require('../../assets/images/logo.png')}
        />
        <TextInput
          value={searchText}
          onChange={setSearchText}
          placeholderTextColor={'#546260'}
          placeholder="search audio track"
          style={styles.searchBarInput}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
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
});
export default AudioLibrary;
