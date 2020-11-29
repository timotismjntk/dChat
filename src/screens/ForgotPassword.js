import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import AlertToasts from '../components/AlertToasts';
import LoadingModal from '../components/LoadingModal';

// import action
import loginAction from '../redux/actions/auth';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [error, SetError] = useState(false);
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState('');
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState(0);

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

  const sendResetCode = async () => {
    try {
      await dispatch(loginAction.getResetCode(email));
    } catch (err) {
      console.log(err.message);
    }
  };
  const authState = useSelector((state) => state.auth);
  const {
    resetCodeData,
    isMatch,
    isErrorResetCode,
    alertMsg,
    isLoading,
  } = authState;

  useEffect(() => {
    if (isMatch) {
      props.navigation.navigate('VerifyResetCode', {
        reset: resetCodeData,
        email: email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMatch]);

  useEffect(() => {
    if (isErrorResetCode && !isLoading) {
      if (!isLoading) {
        setTimeout(() => {
          setAlertMessage(alertMsg);
          setShow(true);
        }, 1500);
        setTimeout(() => {
          setAlertMessage('');
          setShow(false);
          dispatch(loginAction.clearMessageAuth());
        }, 3500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorResetCode, isLoading]);

  return (
    <>
      <LoadingModal requestLoading={isLoading} duration={duration} />
      <AlertToasts visible={show} message={alertMessage} />
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
          onPress={sendResetCode}
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
