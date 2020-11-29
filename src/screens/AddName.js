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

const AddName = (props) => {
  const [name, setName] = useState(props.route.params.username);
  const [errorToast, setErrorToast] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const updateName = async () => {
    await dispatch(userAction.updateProfile(token, {username: name}));
  };
  const userState = useSelector((state) => state.user);
  const {updated, isError, alertMsg, isLoading} = userState;

  useEffect(() => {
    if (updated) {
      setErrorToast(alertMsg);
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(userAction.getProfile(token));
        props.navigation.navigate('UserProfile');
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return (
    <>
      <LoadingModal />
      <LoadingModal requestLoading={isLoading} />
      <AlertToasts visible={show} message={errorToast} />
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            name.length > 0 && {borderColor: '#00B900', borderBottomWidth: 0.7},
          ]}
          maxLength={20}
          onChangeText={(text) => setName(text)}
          value={name}
          autoFocus={true}
        />
        {name.length > 0 && (
          <TouchableOpacity style={styles.btnClear} onPress={() => setName('')}>
            <Ionicons name="close" size={20} color="grey" />
          </TouchableOpacity>
        )}
        <Text style={[styles.inputCount, name.length === 0 && {color: 'red'}]}>
          {name.length}/20
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            name.length > 0 && {backgroundColor: '#00B900'},
          ]}
          onPress={updateName}
          disabled={name.length > 0 ? false : true}>
          <Text style={styles.submittext}>OK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddName;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    borderBottomWidth: 0.4,
    borderColor: 'grey',
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  inputCount: {
    color: 'grey',
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
