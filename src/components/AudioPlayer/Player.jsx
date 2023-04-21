import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StatusBar} from 'react-native';
import AlbumArt from './AlbumArt';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Video from 'react-native-video';
import AudioHeader from './AudioHeader';
import {APP_COLORS} from '../../config/colors';

export default function Player(props) {
  const [paused, setPaused] = useState(true);
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const audioElement = useRef(null);

  useEffect(() => {
    // const track = props.tracks[selectedTrack];
    if (audioElement.current && !isChanging) {
      audioElement.current.seek(currentPosition);
      // setPaused(true);
    }
  }, [selectedTrack]);

  function setDuration(data) {
    setTotalLength(Math.floor(data.duration));
  }

  function setTime(data) {
    setCurrentPosition(Math.floor(data.currentTime));
  }

  function seek(time) {
    time = Math.round(time);
    audioElement.current && audioElement.current.seek(time);
    setCurrentPosition(time);
    setPaused(false);
  }

  function onBack() {
    if (currentPosition < 10 && selectedTrack > 0) {
      audioElement.current && audioElement.current.seek(0);
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPosition(0);
        setPaused(false);
        setTotalLength(1);
        setIsChanging(false);
        setSelectedTrack(selectedTrack - 1);
      }, 0);
    } else {
      audioElement.current.seek(0);
      setCurrentPosition(0);
    }
  }

  function onForward() {
    if (selectedTrack < props.tracks.length - 1) {
      audioElement.current && audioElement.current.seek(0);
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPosition(0);
        setTotalLength(1);
        setPaused(false);
        setIsChanging(false);
        setSelectedTrack(selectedTrack + 1);
      }, 0);
    }
  }

  const track = props.tracks[selectedTrack];
  const video = isChanging ? null : (
    <Video
      source={{uri: track.audioUrl}} // Can be a URL or a local file.
      ref={audioElement}
      // playInBackground={true}
      // playWhenInactive={true}
      paused={paused} // Pauses playback entirely.
      resizeMode="cover" // Fill the whole screen at aspect ratio.
      repeat={true} // Repeat forever.
      // onLoadStart={loadStart} // Callback when video starts to load
      onLoad={setDuration} // Callback when video loads
      onProgress={setTime} // Callback every ~250ms with currentTime
      // onEnd={onEnd} // Callback when playback finishes
      // onError={videoError} // Callback when video cannot be loaded
      style={styles.audioElement}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <AudioHeader title={track.title} message="Playing From Charts" />
      <AlbumArt
        title={track.title}
        artist={track.artist}
        url={track.albumArtUrl}
      />
      <SeekBar
        onSeek={seek}
        trackLength={totalLength}
        onSlidingStart={() => setPaused(true)}
        currentPosition={currentPosition}
      />
      <Controls
        onPressRepeat={() => setRepeatOn(!repeatOn)}
        repeatOn={repeatOn}
        shuffleOn={shuffleOn}
        forwardDisabled={selectedTrack === track.length - 1}
        onPressShuffle={() => setShuffleOn(!shuffleOn)}
        onPressPlay={() => setPaused(false)}
        onPressPause={() => setPaused(true)}
        onBack={onBack}
        onForward={onForward}
        paused={paused}
      />
      {video}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  audioElement: {
    height: 0,
    width: 0,
  },
};
