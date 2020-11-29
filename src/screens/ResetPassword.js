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
} from 'react-native';
import LoadingModal from '../components/LoadingModal';
import AlertToasts from '../components/AlertToasts';

// import action
import userAction from '../redux/actions/user';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ResetPassword = (props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, SetError] = useState(false);
  const [error2, SetError2] = useState(false);
  const [error3, SetError3] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const {email} = props.route.params;
  const [errorToast, setErrorToast] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      oldPassword.toString().length > 0 &&
      password.toString().length >= 6 &&
      repeatPassword.toString().length >= 6
    ) {
      if (password !== repeatPassword) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
    }
  }, [oldPassword, password, repeatPassword]);

  const resetPassword = async () => {
    const data = {
      email,
      oldPassword,
      newPassword: password,
    };
    try {
      await dispatch(userAction.resetPassword(data));
    } catch (e) {
      console.log(e.message);
    }
  };

  const userState = useSelector((state) => state.user);
  const {alertMsgReset, isReset, isLoadingReset, isErrorReset} = userState;

  useEffect(() => {
    if (isErrorReset && !isLoadingReset) {
      setShow(true);
      setErrorToast(alertMsgReset);
      dispatch(userAction.removeMessage());
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorReset]);

  useEffect(() => {
    if (isReset) {
      setTimeout(() => {
        props.navigation.navigate('Welcome');
        dispatch(userAction.removeMessage());
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReset]);

  return (
    <>
      <LoadingModal />
      <LoadingModal requestLoading={isLoadingReset} />
      <AlertToasts visible={show} message={errorToast} />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text>Panjang karakter kata sandi tidak kurang dari 6 karakter.</Text>
          <Text>Setidaknya Kata sandi baru berisi satu huruf dan angka.</Text>
        </View>
        <KeyboardAvoidingView style={styles.parent}>
          <TextInput
            autoFocus={true}
            placeholder="Masukkan Kata Sandi Lama"
            style={[
              styles.input,
              password.toString().length > 0 && {borderColor: '#00B900'},
            ]}
            onChangeText={(number) => {
              setOldPassword(number);
              SetError(true);
            }}
            onFocus={() => SetError(true)}
            value={oldPassword}
            secureTextEntry={true}
          />
          {oldPassword.toString().length < 6 && error && (
            <Text style={styles.error}>Old password is required</Text>
          )}
          {oldPassword.toString().length > 0 && (
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => setOldPassword('')}>
              <Icon name="times" size={20} color="#a5acaf" />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="Kata Sandi (6 s/d 20 kar.)"
            style={[
              styles.input,
              password.toString().length >= 6 && {borderColor: '#00B900'},
            ]}
            onChangeText={(number) => {
              setPassword(number);
              SetError2(true);
            }}
            onFocus={() => SetError2(true)}
            value={password}
            secureTextEntry={true}
          />
          {password.toString().length < 6 && error2 && (
            <Text style={styles.error2}>password is required</Text>
          )}
          {isMatch && password.length > 0 && (
            <Text style={styles.error2}>password doesnt match</Text>
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
              SetError3(true);
            }}
            onFocus={() => SetError3(true)}
            value={repeatPassword}
            secureTextEntry={true}
          />
          {repeatPassword.toString().length < 6 && error3 && (
            <Text style={styles.error3}>Repeat password is required</Text>
          )}
          {isMatch && repeatPassword.length > 1 && (
            <Text style={styles.error3}>repeat password doesnt match</Text>
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
          onPress={resetPassword}
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
            oldPassword.toString().length &&
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

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    // paddingTop: 55,
    backgroundColor: 'white',
    // flex: 1,
  },
  parent: {
    marginTop: 10,
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
