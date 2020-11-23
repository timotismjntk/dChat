import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, SetError] = useState(false);

  useEffect(() => {
    if (
      email.includes('@mail.') ||
      email.includes('@gmail.') ||
      email.includes('@yahoo.') ||
      email.includes('@ymail.')
    ) {
      SetError(false);
      console.log('true');
    } else {
      SetError(true);
    }
  }, [email]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Lupa kata sandi?</Text>
        <Text style={styles.subTitle}>
          Untuk mengatur ulang kata sandi,{'\n'}masukkan alamat email terdaftar
          {'\n'}Anda.{'\n'}
          Email akan dikirim ke alamat email{'\n'}tersebut.
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="alamat email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.btnSubmit, !error && {backgroundColor: '#0ac578'}]}
          disabled={error}>
          <Text style={styles.textSubmit}>OK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  subTitle: {
    fontSize: 16,
    color: 'grey',
    marginTop: 15,
  },
  textInput: {
    borderBottomWidth: 0.4,
    borderColor: 'grey',
    fontSize: 20,
    paddingLeft: 0,
    marginTop: 5,
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
