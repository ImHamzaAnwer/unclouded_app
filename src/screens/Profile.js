import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

function Profile(props) {
  return (
    <View>
      <TouchableOpacity onPress={() => auth().signout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;
