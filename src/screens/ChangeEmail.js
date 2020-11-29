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

// import action
import userAction from '../redux/actions/user';

const ChangeEmail = (props) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const updateEmail = async () => {
    await dispatch(userAction.updateProfile(token, {email: email}));
    await dispatch(userAction.getProfile(token));
    await props.navigation.navigate('ProfileDetail');
  };
  return (
    <>
      <LoadingModal />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoFocus={true}
        />
        {email.length > 0 && (
          <TouchableOpacity
            style={styles.btnClear}
            onPress={() => setEmail('')}>
            <Ionicons name="close" size={20} color="grey" />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            email.length > 0 && {backgroundColor: '#00B900'},
          ]}
          onPress={updateEmail}
          disabled={email.length > 0 ? false : true}>
          <Text style={styles.submittext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChangeEmail;

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
