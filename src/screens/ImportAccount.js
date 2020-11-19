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

export default function ImportAccount(props) {
  const navigateToEnterOldPhone = () =>
    props.navigation.navigate('EnterOldPhone');
  const navigateToEnterOldEmail = () =>
    props.navigation.navigate('EnterOldEmail');

  return (
    <View style={styles.parent}>
      <StatusBar translucent backgroundColor="black" />
      <View style={styles.container}>
        <Text style={styles.header}>Pilih Metode Login</Text>
        <Text style={styles.text}>
          Login dapat dilakukan{'\n'}menggunakan nomor telepon atau{'\n'}
          alamat email yang terdaftar di akun{'\n'}Anda.
        </Text>
      </View>
      <View styles={styles.wrapper}>
        <TouchableOpacity style={styles.btn} onPress={navigateToEnterOldPhone}>
          <Text style={styles.btnText}>Login Dengan No. Telepon Lama</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={navigateToEnterOldEmail}>
          <Text style={styles.login}>Login Dengan Alamat Email</Text>
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
  login: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
  },
});
