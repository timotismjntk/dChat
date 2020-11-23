import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal, TouchableOpacity, Text, View} from 'react-native';

const ShareModal = (props) => {
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
    <Modal
      animationType="fade"
      statusBarTranslucent={false}
      transparent={true}
      onRequestClose={() => setModalVisible(close)}
      visible={modalVisible}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modal}
        onPress={() => setModalVisible(close)}>
        <View style={styles.modalContent}>
          <View style={styles.btnModalContainer}>
            <TouchableOpacity
              style={styles.btnModal}
              onPress={() => setModalVisible(close)}>
              <Text style={styles.modalText}>SMS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnModal}
              onPress={() => setModalVisible(close)}>
              <Text style={styles.modalText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnModal}
              onPress={() => setModalVisible(close)}>
              <Text style={styles.modalText}>Bagikan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ShareModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 15,
  },
  btnModal: {
    padding: 15,
  },
});
