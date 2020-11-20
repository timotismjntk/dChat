/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const ChangePassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, SetError] = useState(false);
  const [error2, SetError2] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (
      password.toString().length >= 6 &&
      repeatPassword.toString().length >= 6
    ) {
      if (password !== repeatPassword) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
    }
  }, [password, repeatPassword]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView>
          <TextInput
            autoFocus={true}
            placeholder="Kata Sandi (6 s/d 20 kar.)"
            style={[
              styles.input,
              password.toString().length >= 6 && {borderColor: '#00B900'},
            ]}
            onChangeText={(number) => {
              setPassword(number);
              SetError(true);
            }}
            onFocus={() => SetError(true)}
            value={password}
            secureTextEntry={true}
          />
          {password.toString().length < 6 && error && (
            <Text style={styles.error}>password is required</Text>
          )}
          {isMatch && password.length > 0 && (
            <Text style={styles.error}>password doesnt match</Text>
          )}
          {password.toString().length > 0 && (
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => setPassword('')}>
              <Icon name="times" size={20} color="#a5acaf" />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="Konfirmasi ulang kata sandi"
            style={[
              styles.input,
              repeatPassword.toString().length >= 6 && {borderColor: '#00B900'},
            ]}
            onChangeText={(number) => {
              setRepeatPassword(number);
              SetError(true);
            }}
            onFocus={() => SetError2(true)}
            value={repeatPassword}
            secureTextEntry={true}
          />
          {repeatPassword.toString().length < 6 && error2 && (
            <Text style={styles.error}>Repeat password is required</Text>
          )}
          {isMatch && repeatPassword.length > 1 && (
            <Text style={styles.error}>repeat password doesnt match</Text>
          )}
          {repeatPassword.toString().length > 0 && (
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => setRepeatPassword('')}>
              <Icon name="times" size={20} color="#a5acaf" />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
      <KeyboardAvoidingView
        style={{
          paddingTop: 0,
          backgroundColor: 'transparent',
        }}>
        <TouchableOpacity
          style={[
            styles.btn,
            password.toString().length &&
              repeatPassword.toString().length >= 6 &&
              password === repeatPassword &&
              (password.search('[a-zA-Z]') &&
                repeatPassword.search('[a-zA-Z]')) !== -1 && {
                backgroundColor: '#00B900',
              },
          ]}
          disabled={
            password.toString().length &&
            repeatPassword.toString().length >= 6 &&
            password === repeatPassword &&
            (password.search('[a-zA-Z]') &&
              repeatPassword.search('[a-zA-Z]')) !== -1
              ? false
              : true
          }>
          <Text style={{color: 'white', fontSize: 18}}>Berikutnya</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    // paddingTop: 55,
    backgroundColor: 'white',
    flex: 1,
  },
  wrapper: {
    marginTop: 15,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: 'grey',
  },
  link: {
    color: '#00B900',
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    // backgroundColor: 'red',
    borderBottomWidth: 0.6,
    borderColor: '#a5acaf',
    fontSize: 18,
    fontWeight: '100',
    marginBottom: 5,
  },
  btn: {
    backgroundColor: '#a5acaf',
    // width: 50,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClear: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
  },
  repeat: {
    textDecorationLine: 'underline',
    marginRight: 15,
  },
});
