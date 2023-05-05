import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {APP_COLORS} from '../config/colors';
import Modal from 'react-native-modal';

const AppModal = ({isVisible, setIsVisible, children, imageModal}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={() => {
        setIsVisible(!isVisible);
      }}
      onBackdropPress={() => {
        setIsVisible(!isVisible);
      }}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              paddingHorizontal: imageModal ? 0 : 20,
              paddingVertical: imageModal ? 0 : 25,
            },
          ]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    // backgroundColor: 'rgba(0,0,0 0.9)',
  },
  modalView: {
    overflow: 'hidden',
    width: '95%',
    backgroundColor: APP_COLORS.itemBackground,
    borderRadius: 20,
    // alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AppModal;
