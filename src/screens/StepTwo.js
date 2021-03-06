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
import LoadingModal from '../components/LoadingModal';

import Icon from 'react-native-vector-icons/FontAwesome5';

const StepTwo = (props) => {
  const [verification, setVerification] = useState('');
  const [error, SetError] = useState(false);

  const navigateTo = () =>
    props.navigation.navigate('StepThree', {
      phone_number: props.route.params.phone_number,
    });

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Masukkan Kode{'\n'}Verifikasi</Text>
        <View style={styles.wrapper}>
          <Text style={styles.info}>Kode verifikasi telah dikirim melalui</Text>
          <Text style={styles.info}>
            SMS ke <Text>{props.route.params.phone_number}</Text>
          </Text>
        </View>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="__ __ __ __ __ __"
            style={[
              styles.input,
              verification.toString().length >= 6 && {borderColor: '#00B900'},
            ]}
            keyboardType="phone-pad"
            onChangeText={(number) => {
              setVerification(number);
              SetError(true);
            }}
            onFocus={() => SetError(true)}
            value={verification}
          />
          {verification.toString().length < 6 && error && (
            <Text style={styles.error}>Verification code is required</Text>
          )}
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={styles.repeat}>Kirim Ulang Kode</Text>
            <Text style={styles.repeat}>Panggil Saya</Text>
          </View>
          {verification.toString().length > 0 && (
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => setVerification('')}>
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
          onPress={navigateTo}
          style={[
            styles.btn,
            verification.toString().length >= 6 && {backgroundColor: '#00B900'},
          ]}
          disabled={verification.toString().length >= 6 ? false : true}>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <LoadingModal duration={1000} />
    </>
  );
};

export default StepTwo;

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
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderColor: '#a5acaf',
    fontSize: 20,
    fontWeight: '100',
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
  repeat: {
    textDecorationLine: 'underline',
    marginRight: 15,
  },
});
