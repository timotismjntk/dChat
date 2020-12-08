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
import AlertToasts from '../components/AlertToasts';

import Icon from 'react-native-vector-icons/FontAwesome5';
// import action
import authAction from '../redux/actions/auth';

const EnterNewPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, SetError] = useState(false);
  const [error2, SetError2] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [show, setShow] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const dispatch = useDispatch();
  console.log(props);

  // const navigateTo = () => props.navigation.navigate('AutoAddFriend');

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

  const {phone_number, data} = props.route.params;

  const createAccount = async () => {
    if (!isSet) {
      data.append('password', password);
      setIsSet(true);
    }
    console.log(data);
    try {
      await dispatch(authAction.signUp(data));
    } catch (e) {
      console.log(e.message);
    }
  };

  const {isSignup, failSignup, alertMsg} = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSignup) {
      props.navigation.navigate('AutoAddFriend', {
        phone_number,
        password,
      });
    }
  }, [isSignup, phone_number, password, dispatch, props.navigation]);

  useEffect(() => {
    if (failSignup) {
      setShow(true);
      setAlertMessage(alertMsg);
      setTimeout(() => {
        setShow(false);
        dispatch(authAction.clearMessageAuth());
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [failSignup]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Buat Kata Sandi</Text>
        <View style={styles.wrapper}>
          <Text style={styles.info}>
            Password minimal sama dengan 6 karakter.{'\n'}
            Gunakan setidaknya satu huruf, satu{'\n'}
            angka, dan empat karakter lainnya
          </Text>
        </View>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="Masukkan Kata Sandi"
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
            placeholder="Masukkan Sekali lagi"
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
          alignItems: 'flex-end',
          padding: 20,
          paddingTop: 0,
          backgroundColor: 'transparent',
        }}>
        <TouchableOpacity
          onPress={createAccount}
          style={[
            styles.btn,
            password.toString().length &&
              repeatPassword.toString().length >= 6 &&
              password === repeatPassword &&
              (password.search('[0-9]') && repeatPassword.search('[0-9]')) !==
                -1 &&
              (password.search('[a-zA-Z]') &&
                repeatPassword.search('[a-zA-Z]')) !== -1 && {
                backgroundColor: '#00B900',
              },
          ]}
          disabled={
            password.toString().length &&
            repeatPassword.toString().length >= 6 &&
            password === repeatPassword &&
            (password.search('[0-9]') && repeatPassword.search('[0-9]')) !==
              -1 &&
            (password.search('[a-zA-Z]') &&
              repeatPassword.search('[a-zA-Z]')) !== -1
              ? false
              : true
          }>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <AlertToasts visible={show} message={alertMessage} />
    </>
  );
};

export default EnterNewPassword;

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
