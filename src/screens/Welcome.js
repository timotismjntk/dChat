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

export default function Welcome(props) {
  const navigateTo = () => props.navigation.navigate('StepOne');
  return (
    <View style={styles.parent}>
      <StatusBar translucent backgroundColor="black" />
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <Text style={[styles.title, styles.header]}>Selamat Datang!</Text>
        <Text style={[styles.title, styles.text]}>
          Coba d•Chat - lancar dan
        </Text>
        <Text style={[styles.title, styles.text]}>
          lebih cepat dari biasanya!
        </Text>
      </View>
      <View styles={styles.wrapper}>
        <TouchableOpacity style={styles.btn} onPress={navigateTo}>
          <Text style={styles.btnStart}>Mulai</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.alreadyAccount}>
            Login dengan Alamat Email atau {'\n'}Kode QR
          </Text>
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
    backgroundColor: '#0ac578',
    padding: 20,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 135,
    resizeMode: 'contain',
    height: 135,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  text: {
    color: '#ced7df',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStart: {
    color: '#0ac578',
    fontSize: 16,
  },
  btn: {
    width: 300,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 5,
  },
  alreadyAccount: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
});
