import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Logo from '../assets/logo.png';

export default function StepThree(props) {
  const navigateToNewAccount = () =>
    props.navigation.navigate('CreateNewAccount');
  const navigateToImportAccount = () =>
    props.navigation.navigate('ImportAccount');

  return (
    <View style={styles.parent}>
      <StatusBar translucent backgroundColor="black" />
      <View style={styles.container}>
        <Text style={styles.header}>Pindahkan Akun?</Text>
        <Text style={styles.text}>
          Jika Anda memiliki akun di perangkat {'\n'} lain , akun tersebut dapat
          dipindahkan{'\n'}ke perangkat ini menggunakan nomor{'\n'}
          telepon atau alamat email yang{'\n'}terdaftar di akun tersebut.
        </Text>
      </View>
      <View styles={styles.wrapper}>
        <TouchableOpacity style={styles.btn} onPress={navigateToImportAccount}>
          <Text style={styles.btnText}>Pindahkan Akun Saya</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={navigateToNewAccount}>
          <Text style={styles.createNew}>Buat Akun baru</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    paddingTop: 55,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    width: '100%',
    //   justifyContent: 'center',
    //   alignItems: 'center',
  },
  logo: {
    width: 135,
    resizeMode: 'contain',
    height: 135,
  },
  header: {
    fontSize: 30,
    marginBottom: 15,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 17,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
  btn: {
    width: 300,
    height: 50,
    backgroundColor: '#0ac578',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  createNew: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
  },
});
