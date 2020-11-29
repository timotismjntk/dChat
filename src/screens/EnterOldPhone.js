/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Picker} from 'native-base';
import LoadingModal from '../components/LoadingModal';
import AlertToasts from '../components/AlertToasts';

import Icon from 'react-native-vector-icons/FontAwesome5';

// import action
import loginAction from '../redux/actions/auth';

const EnterOldPhone = () => {
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, SetError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [show, setShow] = useState(false);

  const loginState = useSelector((state) => state.auth);
  const {isLoading, alertMsgLoginNumber, isErrorNumber} = loginState;

  const dispatch = useDispatch();
  const makeLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    try {
      await dispatch(loginAction.loginNumber(phone_number, password));
    } catch (err) {}
  };

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isErrorNumber) {
      setAlertMessage(alertMsgLoginNumber);
      setShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorNumber]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
        dispatch(loginAction.clearMessageAuth());
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

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
              phone_number.toString().length >= 6 && {borderColor: '#00B900'},
            ]}
            keyboardType="phone-pad"
            onChangeText={(text) => {
              setPhone(text);
              SetError(true);
            }}
            onFocus={() => SetError(true)}
            value={phone_number}
          />
          {phone_number.toString().length < 6 && error && (
            <Text style={styles.error}>Phone number is required</Text>
          )}
          {phone_number.toString().length > 0 && (
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => setPhone('')}>
              <Icon name="times" size={20} color="#a5acaf" />
            </TouchableOpacity>
          )}
          <TextInput
            placeholder="Password"
            style={[
              styles.input,
              password.toString().length >= 6 && {borderColor: '#00B900'},
            ]}
            onChangeText={(number) => {
              setPassword(number);
            }}
            value={password}
          />
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
            phone_number.toString().length >= 6 && {backgroundColor: '#00B900'},
          ]}
          onPress={makeLogin}
          disabled={phone_number.toString().length >= 6 ? false : true}>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <LoadingModal requestLoading={loading} />
      <AlertToasts visible={show} message={alertMessage} />
    </>
  );
};

export default EnterOldPhone;

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
    top: 70,
    right: 20,
  },
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
