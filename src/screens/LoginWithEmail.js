import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/EvilIcons';

const LoginWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, SetError] = useState(false);
  const [errorEmail, SetErrorEmail] = useState(false);
  const check =
    email.includes('@mail.') ||
    email.includes('@gmail.') ||
    email.includes('@yahoo.') ||
    email.includes('@ymail.');

  useEffect(() => {
    if (check && password.toString().length > 0) {
      SetError(false);
    } else {
      SetError(true);
    }
  }, [check, password]);

  useEffect(() => {
    if (check) {
      SetErrorEmail(false);
    } else {
      SetErrorEmail(true);
    }
  }, [check]);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.textInput,
            email.length > 0 &&
              !errorEmail && {
                borderColor: '#0ac578',
                borderBottomWidth: 1,
              },
          ]}
          placeholder="alamat email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {email.length > 0 && (
          <TouchableOpacity
            style={styles.btnClear}
            onPress={() => setEmail('')}>
            <Ionicons name="close" size={24} color="grey" />
          </TouchableOpacity>
        )}
        <TextInput
          style={[
            styles.textInput,
            password.toString().length > 0 && {
              borderColor: '#0ac578',
              borderBottomWidth: 1,
            },
          ]}
          placeholder="Kata Sandi"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {password.toString().length > 0 && (
          <TouchableOpacity
            style={[styles.btnClear, {top: 102}]}
            onPress={() => setPassword('')}>
            <Ionicons name="close" size={24} color="grey" />
          </TouchableOpacity>
        )}
        <Text style={styles.link}>Lupa kata sandi ?</Text>
        <View style={styles.QRCode}>
          <Icon name="qrcode" size={20} />
          <Text style={styles.qrText}>Login dengan kode QR</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[
            styles.btnSubmit,
            password.toString().length > 0 &&
              !error && {backgroundColor: '#0ac578'},
          ]}
          disabled={error}>
          <Text style={styles.textSubmit}>OK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginWithEmail;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    fontSize: 20,
    paddingLeft: 0,
    marginTop: 2,
  },
  btnClear: {
    position: 'absolute',
    top: 55,
    right: 20,
  },
  link: {
    textDecorationLine: 'underline',
    color: 'grey',
    fontSize: 15,
    marginTop: 10,
  },
  QRCode: {
    flexDirection: 'row',
    marginTop: 20,
  },
  qrText: {
    fontSize: 15,
    marginLeft: 10,
  },
  bottom: {
    padding: 20,
    paddingBottom: 15,
  },
  btnSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    borderRadius: 5,
  },
  textSubmit: {
    fontSize: 20,
    color: 'white',
  },
});
