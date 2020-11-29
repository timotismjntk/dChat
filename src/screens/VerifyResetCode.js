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
  Keyboard,
} from 'react-native';
import AlertToasts from '../components/AlertToasts';
import LoadingModal from '../components/LoadingModal';

import Icon from 'react-native-vector-icons/FontAwesome5';
import authAction from '../redux/actions/auth';

const VerifyResetCode = (props) => {
  const [verification, setVerification] = useState('');
  const [error, SetError] = useState(false);
  const [show, setShow] = useState(false);
  const [showVerifyError, setShowVerifyError] = useState(false);
  const [alert, setAlert] = useState('');
  const {reset, email} = props.route.params;

  useEffect(() => {
    setTimeout(() => {
      setAlert(`Masukkan kode berikut: ${reset}`);
      setShow(true);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const {isVerify, isErrorVerify, alertMsg} = authState;

  const verify = async () => {
    Keyboard.dismiss();
    try {
      await dispatch(authAction.verifyResetCode(email, reset));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (isVerify) {
      setShow(false);
      setAlert('');
      props.navigation.navigate('ResetPassword', {email: email});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerify]);

  useEffect(() => {
    if (isErrorVerify) {
      setShowVerifyError(true);
      setTimeout(() => {
        setShowVerifyError(false);
        dispatch(authAction.clearMessageAuth());
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorVerify]);

  return (
    <>
      <AlertToasts visible={show} message={alert} />
      <AlertToasts
        position={200}
        visible={showVerifyError}
        message={alertMsg}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Masukkan Kode{'\n'}Reset</Text>
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
            <Text style={styles.error}>Reset code is required</Text>
          )}
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
          onPress={verify}
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

export default VerifyResetCode;

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
