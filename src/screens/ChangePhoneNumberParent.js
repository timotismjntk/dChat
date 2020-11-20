import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import userProfile from '../API/userProfile.json';

const ChangePhoneNumberParent = (props) => {
  const navigateToChangePhoneNumber = () => {
    props.navigation.navigate('ChangePhoneNumber');
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.parent}>
          <Text style={styles.header}>Nomor Telepon Terdaftar:</Text>
          <Text style={styles.phone}>
            {userProfile.user_profile.phone_number}
          </Text>
        </View>
        <View style={styles.parent}>
          <Text style={styles.textInfo}>
            Tindakan ini akan mengubah no. telepon yang{'\n'}terdaftar di
            d•Chat.
            {'\n'}Tekan tombol di bawah untuk melanjutkan.
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={navigateToChangePhoneNumber}
          style={styles.submitButton}>
          <Text style={styles.submittext}>Ubah Nomor Telepon</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChangePhoneNumberParent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  header: {
    fontSize: 16,
    marginBottom: 15,
  },
  phone: {
    color: '#00B900',
    fontSize: 30,
  },
  textInfo: {
    textAlign: 'center',
    color: 'grey',
  },
  submitButton: {
    backgroundColor: '#00B900',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submittext: {
    color: 'white',
    fontSize: 16,
  },
});
