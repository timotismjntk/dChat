import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {Thumbnail} from 'native-base';
import account from '../assets/account.jpg';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const CreateGroup = () => {
  const [items, setItems] = useState('');

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
      <View style={{flex: 1}}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            <Thumbnail large source={items ? {uri: items} : account} />
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
              style={styles.camera}>
              <Icon name="camera" size={15} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <TextInput style={styles.textInput} placeholder="Nama Grup" />
          </View>
        </View>
        <View style={styles.body}>
          <Text>Anggota 0</Text>
          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.btn}>
              <EvilIcons
                name="close"
                size={25}
                color="black"
                style={styles.add}
              />
            </TouchableOpacity>
            <Text>Tambah</Text>
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <TouchableOpacity disabled={true} style={styles.btnSave}>
          <Text style={styles.btnSaveText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 0.9,
    borderColor: 'grey',
    paddingBottom: 25,
    paddingHorizontal: 15,
  },
  imageContainer: {
    marginRight: 15,
  },
  camera: {
    position: 'absolute',
    left: 55,
    top: 60,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 25,
    borderColor: 'white',
  },
  input: {
    // flex: 1,
  },
  textInput: {
    fontSize: 18,
  },
  add: {
    transform: [{rotate: '45deg'}],
    position: 'absolute',
  },
  btnWrapper: {
    padding: 10,
  },
  btn: {
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
  },
  body: {
    paddingHorizontal: 15,
  },
  btnSave: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  btnSaveText: {
    fontSize: 20,
    color: 'white',
  },
});
