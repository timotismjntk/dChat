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
import {Picker} from 'native-base';
import LoadingModal from '../components/LoadingModal';
import AlertToasts from '../components/AlertToasts';

import Icon from 'react-native-vector-icons/FontAwesome5';

// import action
import userAction from '../redux/actions/user';

const ChangePhoneNumber = (props) => {
  const [phone, setPhone] = useState('');
  const [error, SetError] = useState(false);
  const [errorToast, setErrorToast] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userState = useSelector((state) => state.user);
  const {updated, isError, alertMsg} = userState;

  const updateNumber = async () => {
    await dispatch(userAction.updateProfile(token, {phone_number: phone}));
  };
  useEffect(() => {
    if (isError) {
      setShow(true);
      setErrorToast(alertMsg);
      setTimeout(() => {
        setShow(false);
        dispatch(userAction.removeMessage());
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (updated) {
      setShow(true);
      setErrorToast(alertMsg);
      setTimeout(() => {
        setShow(false);
      }, 1500);
      dispatch(userAction.getProfile(token));
      props.navigation.navigate('ProfileDetail');
      dispatch(userAction.removeMessage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return (
    <>
      <LoadingModal />
      <AlertToasts visible={show} message={errorToast} />
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView>
          <Text style={styles.nation}>Indonesia</Text>
          <TextInput
            autoFocus={true}
            placeholder="No. Telepon"
            maxLenght={12}
            style={[
              styles.input,
              phone.toString().length >= 12 && {borderColor: '#00B900'},
            ]}
            keyboardType="phone-pad"
            onChangeText={(number) => {
              setPhone(number);
              SetError(true);
            }}
            onFocus={() => SetError(true)}
            value={phone}
          />
          {phone.toString().length <= 12 && error && (
            <Text style={styles.error}>Phone number is required</Text>
          )}
          {phone.toString() === props.route.params.phone_number && (
            <Text style={styles.error}>
              Phone number cant be same with old phone number
            </Text>
          )}
          {phone.toString().length > 0 && (
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => setPhone('')}>
              <Icon name="times" size={20} color="#a5acaf" />
            </TouchableOpacity>
          )}
          <View style={styles.wrapper}>
            <Text style={styles.info}>
              Verifikasi no. telepon baru Anda{'\n'}
              terlebih dahulu sebelum mengganti no.{'\n'}
              telepon yang terdaftar di d•Chat. Dengan{'\n'}
              mengetuk tombol Berikutnya, maka{'\n'}
              Anda dianggap telah menyetujui{' '}
              <Text style={styles.link}>
                Syarat{'\n'}dan Ketentuan Penggunaan
              </Text>{' '}
              serta{'\n'}
              <Text style={styles.link}>Kebijakan Privasi</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <KeyboardAvoidingView>
        <TouchableOpacity
          style={[
            styles.btn,
            phone.toString().length === 12 && {backgroundColor: '#00B900'},
          ]}
          onPress={updateNumber}
          disabled={
            phone !== props.route.params.phone_number &&
            phone.toString().length === 12
              ? false
              : true
          }>
          <Text style={styles.submittext}>Berikutnya</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChangePhoneNumber;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    fontSize: 28,
  },
  wrapper: {
    marginTop: 15,
    marginBottom: 10,
  },
  info: {
    fontSize: 15,
    color: 'grey',
  },
  nation: {
    fontSize: 17,
  },
  link: {
    color: '#00B900',
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    // backgroundColor: 'red',
    paddingVertical: 5,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderColor: '#a5acaf',
    fontSize: 20,
    marginBottom: 5,
  },
  btn: {
    backgroundColor: '#a5acaf',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClear: {
    position: 'absolute',
    top: 33,
    right: 20,
  },
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
  },
  submittext: {
    color: 'white',
    fontSize: 18,
  },
});
