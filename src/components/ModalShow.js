/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ModalShowingOption = (props) => {
  const {open, close} = props;
  const [modalVisible, setModalVisible] = useState(open);

  useEffect(() => {
    if (open === true) {
      setModalVisible(open);
    } else if (open === false) {
      setModalVisible(open);
    }
  }, [open]);
  return (
    <>
      <View style={{flex: 1}}>
        <Modal
          animationType="fade"
          statusBarTranslucent={false}
          transparent={true}
          onRequestClose={() => setModalVisible(close)}
          visible={modalVisible}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(close);
            }}
            activeOpacity={1}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(100,105,110, 0.65)',
              paddingBottom: 5,
              paddingRight: 15,
            }}>
            <View style={styles.centeredView}>
              <TouchableOpacity
                style={styles.btnIcon}
                onPress={() => {
                  setModalVisible(close);
                }}>
                <Icon name="video" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.centeredView}>
              <TouchableOpacity
                style={styles.btnIcon}
                onPress={() => {
                  setModalVisible(close);
                }}>
                <Icon
                  name="phone"
                  size={20}
                  style={{transform: [{rotate: '100deg'}]}}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.centeredView}>
              <TouchableOpacity
                style={styles.btnIcon}
                onPress={() => {
                  setModalVisible(close);
                }}>
                <Icon name="comment-dots" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={[styles.centeredView, {marginBottom: 20}]}>
              <TouchableOpacity
                style={{...styles.btnIcon, backgroundColor: '#0ac578'}}
                onPress={() => {
                  setModalVisible(close);
                }}>
                <Icon name="times" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
};

export default ModalShowingOption;

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 5,
    // borderRadius: 200,
  },
  modalView: {
    margin: 20,
    borderRadius: 200,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  btnIcon: {
    backgroundColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
