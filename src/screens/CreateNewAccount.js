/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Thumbnail} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import account from '../assets/account.jpg';

const CreateNewAccount = (props) => {
  const [name, setName] = useState('');
  const [error, SetError] = useState(false);
  const [items, setItems] = useState('');

  const navigateTo = () => props.navigation.navigate('EnterNewPassword');

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const createFormData = (results) => {
    const image = new FormData();
    console.log(results);

    image.append('picture', {
      name: results.fileName,
      type: results.type,
      uri: results.uri,
    });
    console.log(image._parts[0][1]);
    if (results.fileSize > 500000) {
      //   setMessage('image size is too large, atleast < 500 kb');
      //   setVisible(true);
      //   setTimeout(() => {
      //     setVisible(false);
      //   }, 3000);
    } else {
      setItems(image._parts[0][1].uri);
      //   dispatch(profileAction.uploadProfileImage(token, image)).catch((err) =>
      // console.log(err.message),
      //   );
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Buat Akun Baru</Text>
        <View style={styles.wrapper}>
          <Text style={styles.info}>
            Pengguna lain di d•Chat dapat melihat{'\n'}
            nama tampilan dan media profil Anda.
          </Text>
          <View style={styles.imageContainer}>
            <Thumbnail source={items ? {uri: items} : account} />
          </View>
          <TouchableOpacity
            onPress={() => {
              ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log(
                    'User tapped custom button: ',
                    response.customButton,
                  );
                } else {
                  createFormData(response);
                }
              });
            }}
            style={{
              position: 'absolute',
              left: 35,
              top: 100,
              borderWidth: 1,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 25,
              borderColor: 'white',
            }}>
            <Icon name="camera" size={15} color="grey" />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="Nama Tampilan"
            style={[styles.input, name.length > 0 && {borderColor: '#0ac578'}]}
            onChangeText={(text) => {
              setName(text);
              SetError(true);
            }}
            onFocus={() => SetError(true)}
            value={name}
          />
          {name.length < 0 && error && (
            <Text style={styles.error}>Name is required</Text>
          )}
          {name.length > 0 && (
            <TouchableOpacity
              style={styles.btnClear}
              onPress={() => setName('')}>
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
          onPress={navigateTo}
          style={[styles.btn, name.length > 0 && {backgroundColor: '#0ac578'}]}
          disabled={name.length > 0 ? false : true}>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateNewAccount;

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
    color: '#0ac578',
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
    top: 18,
    right: 20,
  },
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 25,
    marginRight: 15,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
});
