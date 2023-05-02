import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

function Home(props) {
  return (
    <View>
      <TouchableOpacity onPress={() => auth().signOut()}>
        <Text>HOME</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
