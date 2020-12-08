import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/EvilIcons';
import LoadingModal from '../components/LoadingModal';
import AlertToasts from '../components/AlertToasts';

// import action
import loginAction from '../redux/actions/auth';
import deviceAction from '../redux/actions/device';

const LoginWithEmail = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, SetError] = useState(false);
  const [errorEmail, SetErrorEmail] = useState(false);
  const [errorToast, setErrorToast] = useState('');
  const [show, setShow] = useState(false);

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

  / * -------------------------------------- */;
  const dispatch = useDispatch();
  const deviceToken = useSelector((state) => state.device.deviceToken);
  const makeLogin = async () => {
    try {
      console.log(deviceToken);
      await dispatch(loginAction.login(email, password, deviceToken));
      const data = {
        email,
        deviceToken,
      };
      await dispatch(deviceAction.setDeviceTokenToDatabase(data));
    } catch (e) {
      console.log(e.message);
    }
  };

  const navigateToForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };

  const authState = useSelector((state) => state.auth);
  const {isLogin, isError, alertMsg, isLoading} = authState;
  const deviceState = useSelector((state) => state.device);
  const {isLoadingRegister, isErrorRegister, isRegister} = deviceState;

  useEffect(() => {
    if (isErrorRegister) {
      setErrorToast(alertMsg);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorRegister]);

  useEffect(() => {
    if (isError) {
      setErrorToast(alertMsg);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1500);
      dispatch(loginAction.clearMessageLoginByEmail());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        dispatch(loginAction.clearMessageLoginByEmail());
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLogin && isRegister) {
      setErrorToast(alertMsg);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1500);
      setTimeout(() => {
        props.navigation.navigate('Home');
      }, 2000);
      dispatch(loginAction.clearMessageLoginByEmail());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingModal />
      <LoadingModal requestLoading={isLoading} />
      <AlertToasts visible={show} message={errorToast} />
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
        <TouchableOpacity onPress={navigateToForgotPassword}>
          <Text style={styles.link}>Lupa kata sandi ?</Text>
        </TouchableOpacity>
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
          onPress={makeLogin}
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
