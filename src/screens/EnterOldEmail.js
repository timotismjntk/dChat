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

const EnterOldEmail = () => {
  const [email, setEmail] = useState('');
  const [error, SetError] = useState(false);

  useEffect(() => {
    if (email.includes('@mail.') || email.includes('@gmail.')) {
      SetError(false);
      console.log('true');
    } else {
      SetError(true);
    }
  }, [email]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Masukkan Alamat{'\n'}Email</Text>
        <View style={styles.wrapper}>
          <Text style={styles.info}>
            Masukkan alamat email yang{'\n'}terdaftar di
            <Text style={styles.link}> akun Anda </Text>
            di sini.
          </Text>
        </View>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="Alamat Email"
            style={[styles.input, email.length > 0 && {borderColor: '#00B900'}]}
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
              SetError(true);
            }}
            onFocus={() => SetError(true)}
            value={email}
            autoCompleteType="email"
            autoCorrect={true}
          />
          {email.length < 0 && (
            <Text style={styles.error}>Email is required</Text>
          )}
          {error && email.length > 0 && (
            <Text style={styles.error}>Please enter a valid email</Text>
          )}
          {email.length > 0 && (
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => setEmail('')}>
              <Icon name="times" size={20} color="#a5acaf" />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
      <KeyboardAvoidingView
        style={{
          alignItems: 'flex-end',
          padding: 20,
        }}>
        <TouchableOpacity
          style={[styles.btn, !error && {backgroundColor: '#00B900'}]}
          disabled={error ? true : false}>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default EnterOldEmail;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
  },
  header: {
    fontSize: 28,
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
  },
  input: {
    width: '100%',
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderColor: '#a5acaf',
    fontSize: 20,
    marginBottom: 5,
  },
  btn: {
    backgroundColor: '#a5acaf',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
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
});
