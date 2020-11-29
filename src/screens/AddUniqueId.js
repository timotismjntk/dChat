import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/EvilIcons';
import LoadingModal from '../components/LoadingModal';
import AlertToasts from '../components/AlertToasts';

// import action
import userAction from '../redux/actions/user';

const AddUniqueId = (props) => {
  const [uniqueId, setUniqueId] = useState(
    props.route.params.unique_id ? props.route.params.unique_id : '',
  );

  const [errorToast, setErrorToast] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userState = useSelector((state) => state.user);
  const {updated, isError, alertMsg} = userState;

  const updateUniqueId = async () => {
    await dispatch(userAction.updateProfile(token, {unique_id: uniqueId}));
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
      props.navigation.navigate('UserProfile');
      dispatch(userAction.removeMessage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return (
    <>
      <LoadingModal />
      <AlertToasts visible={show} message={errorToast} />
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            uniqueId.length > 0 && {
              borderColor: '#00B900',
              borderBottomWidth: 0.7,
            },
          ]}
          maxLength={20}
          onChangeText={(text) => setUniqueId(text)}
          value={uniqueId}
          autoFocus={true}
        />
        {uniqueId.length > 0 && (
          <TouchableOpacity
            style={styles.btnClear}
            onPress={() => setUniqueId('')}>
            <Ionicons name="close" size={20} color="grey" />
          </TouchableOpacity>
        )}
        <Text style={[styles.inputInfo]}>
          Atur ID d•Chat Anda.{'\n'}Setelah diatur, ID tidak dapat di ubah.
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            uniqueId.length >= 4 && {backgroundColor: '#00B900'},
          ]}
          onPress={updateUniqueId}
          disabled={uniqueId.length >= 4 ? false : true}>
          <Text style={styles.submittext}>Periksa</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddUniqueId;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: 'white',
    flex: 1,
  },
  input: {
    borderBottomWidth: 0.4,
    borderColor: 'grey',
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  inputInfo: {
    color: 'grey',
    marginTop: 10,
  },
  btnClear: {
    position: 'absolute',
    top: 40,
    right: 22,
  },
  submitButton: {
    backgroundColor: 'grey',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submittext: {
    color: 'white',
    fontSize: 16,
  },
});
