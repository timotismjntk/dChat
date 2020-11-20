/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CheckBox} from 'react-native-btr';

import account from '../assets/account.jpg';

import userProfile from '../API/userProfile.json';

const UserProfile = (props) => {
  const [items, setItems] = useState('');
  const [isSelected, setSelected] = useState(false);

  const navigateToAddName = () => {
    props.navigation.navigate('AddName');
  };
  const navigateToAddStatusMessage = () => {
    props.navigation.navigate('AddStatusMessage');
  };
  const navigateToAddUniqueId = () => {
    props.navigation.navigate('AddUniqueId');
  };

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
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.header}>
        <Thumbnail
          large
          source={
            userProfile.user_profile.profile_image
              ? {uri: userProfile.user_profile.profile_image}
              : account
          }
        />
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
        <View style={styles.upperContainer}>
          <Text style={styles.title}>Nomor Telepon</Text>
          <Text style={styles.phone}>
            {userProfile.user_profile.phone_number}
          </Text>
        </View>
      </View>
      <View style={{paddingLeft: 15}}>
        <TouchableOpacity
          onPress={navigateToAddName}
          style={styles.bodyWrapper}>
          <Text style={styles.titleName}>Nama tampilan</Text>
          <Text style={styles.name}>{userProfile.user_profile.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToAddStatusMessage}
          style={styles.bodyWrapper}>
          <Text style={styles.titleMessageStatus}>Pesan Status</Text>
          <Text style={styles.status_message}>
            {userProfile.user_profile.status_message
              ? userProfile.user_profile.status_message
              : 'Belum Diatur'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToAddUniqueId}
          style={styles.bodyWrapper}>
          <Text style={styles.titleUniqueId}>ID Pengguna</Text>
          <Text style={styles.unique_id}>
            {userProfile.user_profile.unique_id
              ? userProfile.user_profile.unique_id
              : 'Belum Diatur'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected(!isSelected);
          }}>
          <View style={[styles.bodyWrapper, styles.checkbox]}>
            <View>
              <Text style={styles.titleSharePhotoOptions}>
                Berbagi Foto Profil Baru
              </Text>
              <Text style={styles.shareOptionText}>
                Ketika Anda mengganti foto profil Anda foto{'\n'}
                profil baru Anda akan dibagikan ke Timeline.
              </Text>
            </View>
            <CheckBox
              checked={isSelected}
              onPress={() => {
                setSelected(!isSelected);
              }}
              color="#13a538"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingVertical: 20,
    borderBottomWidth: 0.3,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  camera: {
    position: 'absolute',
    left: 70,
    top: 75,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 25,
    borderColor: 'white',
  },
  upperContainer: {
    marginLeft: 15,
  },
  title: {
    color: 'grey',
  },
  phone: {
    fontSize: 18,
    fontWeight: '800',
  },
  bodyWrapper: {
    paddingVertical: 15,
    paddingRight: 15,
    borderBottomWidth: 0.4,
    borderColor: 'grey',
  },
  titleName: {
    fontSize: 16,
    color: 'black',
  },
  titleMessageStatus: {
    fontSize: 16,
    color: 'black',
  },
  name: {
    color: '#5851db',
  },
  status_message: {
    color: '#5851db',
  },
  titleUniqueId: {
    fontSize: 16,
    color: 'black',
  },
  unique_id: {
    color: '#5851db',
  },
  titleSharePhotoOptions: {
    fontSize: 16,
    color: 'black',
  },
  shareOptionText: {
    color: 'grey',
    fontSize: 13,
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
