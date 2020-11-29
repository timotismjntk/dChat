import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoadingModal from '../components/LoadingModal';

const QRCode = () => {
  return (
    <View style={styles.container}>
      <LoadingModal />
      <View style={styles.wrapper}>
        <View style={styles.parent}>
          <Icon name="qrcode" size={150} />
        </View>
      </View>
      <View style={styles.btnBottom}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>Perbarui</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>Bagikan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRCode;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 70,
    backgroundColor: 'white',
  },
  wrapper: {
    borderWidth: 21,
    borderColor: '#7b858e',
  },
  parent: {
    padding: 25,
    paddingVertical: 10,
  },
  btnBottom: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#0ac578',
    padding: 10,
    paddingHorizontal: 29,
  },
  text: {
    color: 'white',
  },
});
