import React, {useEffect} from 'react';
import Player from '../../components/AudioPlayer/Player';
import {BackHandler} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {TRACKS} from '../../config/tracks';

const AudioPlayer = ({navigation, route, songId}) => {
  const track = route.params.track;
  const playlist = route.params.playlist;

  useEffect(() => {
    const handleBackButton = () => {
      StackActions.pop();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return <Player tracks={playlist || [track] || TRACKS} />;
};

export default AudioPlayer;
