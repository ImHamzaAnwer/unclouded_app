import React, {useEffect} from 'react';
import Player from '../../components/AudioPlayer/Player';
import {BackHandler} from 'react-native';
import {StackActions} from '@react-navigation/native';

const AudioPlayer = ({navigation, route, songId}) => {
  useEffect(() => {
    navigation.setParams({
      title: 'Panchkhan',
    });
    const handleBackButton = () => {
      StackActions.pop();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const TRACKS = [
    {
      title: 'Stressed Out',
      artist: 'Double One Pilots',
      albumArtUrl:
        'https://cdn-images-1.medium.com/max/1344/1*fF0VVD5cCRam10rYvDeTOw.jpeg',
      audioUrl:
        'https://www.chosic.com/wp-content/uploads/2021/04/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3',
    },
    {
      title: 'Stressed Out 22',
      artist: 'Fify One Pilots',
      albumArtUrl:
        'https://cdn-images-1.medium.com/max/1344/1*fF0VVD5cCRam10rYvDeTOw.jpeg',
      audioUrl:
        'https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3',
    },
    {
      title: 'Stressed Out 33',
      artist: 'Twenty One Workets',
      albumArtUrl:
        'https://cdn-images-1.medium.com/max/1344/1*fF0VVD5cCRam10rYvDeTOw.jpeg',
      audioUrl:
        'https://www.chosic.com/wp-content/uploads/2021/05/inossi-got-you.mp3',
    },
  ];

  return <Player tracks={TRACKS} />;
};

export default AudioPlayer;
