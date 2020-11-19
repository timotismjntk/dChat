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
import {Picker} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';

const StepOne = () => {
  const [phone, setPhone] = useState('');
  const [error, SetError] = useState(false);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Masukkan Nomor{'\n'}Telepon Lama</Text>
        <View style={styles.wrapper}>
          <Text style={styles.info}>
            Masukkan nomor telepon yang{'\n'}digunakan di
            <Text style={styles.link}> Perangkat Lama Anda </Text>
            di{'\n'}sini.
          </Text>
        </View>
        <KeyboardAvoidingView>
          <Picker note mode="dropdown" style={{width: 135, color: 'black'}}>
            <Picker.Item label="Indonesia" value="key0" />
          </Picker>
          <TextInput
            placeholder="Nomor Telepon"
            style={[
              styles.input,
              phone.toString().length >= 6 && {borderColor: '#0ac578'},
            ]}
            keyboardType="phone-pad"
            onChangeText={(number) => {
              setPhone(number);
              SetError(true);
            }}
            onFocus={() => SetError(true)}
            value={phone}
          />
          {phone.toString().length < 6 && error && (
            <Text style={styles.error}>Phone number is required</Text>
          )}
          {phone.toString().length > 0 && (
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => setPhone('')}>
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
          style={[
            styles.btn,
            phone.toString().length >= 6 && {backgroundColor: '#0ac578'},
          ]}
          disabled={phone.toString().length >= 6 ? false : true}>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  container: {
    padding: 25,
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
    color: '#0ac578',
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
    top: 70,
    right: 20,
  },
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
