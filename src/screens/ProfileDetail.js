/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CheckBox} from 'react-native-btr';

import userProfile from '../API/userProfile.json';

const ProfileDetail = () => {
  const [isAllowAdd, setIsAllowAdd] = useState(false);
  const [isAllowLogin, setIsAllowLogin] = useState(false);

  return (
    <View>
      <View style={{paddingLeft: 15}}>
        <TouchableOpacity style={styles.bodyWrapper}>
          <Text style={styles.titlePhone}>Nomor Telepon</Text>
          <Text style={styles.phoneNumber}>
            {userProfile.user_profile.phone_number}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bodyWrapper}>
          <Text style={styles.titleMessageStatus}>Email</Text>
          <Text style={styles.email}>
            {userProfile.user_profile.email
              ? userProfile.user_profile.email
              : 'Belum Diatur'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bodyWrapper}>
          <Text style={styles.titlePassword}>Kata Sandi</Text>
          <Text style={styles.password}>Selesai</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsAllowAdd(!isAllowAdd);
          }}>
          <View style={[styles.bodyWrapper, styles.checkbox]}>
            <View>
              <Text style={styles.titleAddById}>Izinkan Tambah dengan ID</Text>
              <Text style={styles.titleAddByIdText}>
                Orang dapat menambahkan Anda sebagai{'\n'}
                teman dengan mencari ID Anda.
              </Text>
            </View>
            <CheckBox
              checked={isAllowAdd}
              onPress={() => {
                setIsAllowAdd(!isAllowAdd);
              }}
              color="#13a538"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsAllowLogin(!isAllowLogin);
          }}>
          <View style={[styles.bodyWrapper, styles.checkbox]}>
            <View>
              <Text style={styles.titleAllowLogin}>Izinkan Login</Text>
              <Text style={styles.titleAllowLoginText}>
                Nyalakan ini untuk menggunakan d•Chat versi PC{'\n'}
                dari iPad, dan untuk login ke layanan web d•Chat{'\n'}
                lainnya.
              </Text>
            </View>
            <CheckBox
              checked={isAllowLogin}
              onPress={() => {
                setIsAllowLogin(!isAllowLogin);
              }}
              color="#13a538"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bodyWrapper}>
          <Text style={styles.device}>Perangkat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bodyWrapper}>
          <Text style={styles.qrCode}>Kode QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bodyWrapper}>
          <Text style={styles.deleteAccount}>Hapus Akun</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  upperContainer: {
    marginLeft: 15,
  },
  title: {
    color: 'grey',
  },
  bodyWrapper: {
    paddingVertical: 10,
    paddingRight: 15,
    borderBottomWidth: 0.4,
    borderColor: 'grey',
  },
  titlePhone: {
    fontSize: 16,
    color: 'black',
  },
  titleMessageStatus: {
    fontSize: 16,
    color: 'black',
  },
  phoneNumber: {
    color: '#5851db',
  },
  email: {
    color: '#5851db',
  },
  titlePassword: {
    fontSize: 16,
    color: 'black',
  },
  password: {
    color: '#5851db',
  },
  titleAddById: {
    fontSize: 16,
    color: 'black',
  },
  titleAddByIdText: {
    color: 'grey',
    fontSize: 13,
  },
  titleAllowLogin: {
    fontSize: 16,
    color: 'black',
  },
  titleAllowLoginText: {
    color: 'grey',
    fontSize: 13,
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  device: {
    fontSize: 16,
    color: 'black',
  },
  qrCode: {
    fontSize: 16,
    color: 'black',
  },
  deleteAccount: {
    fontSize: 16,
    color: 'black',
  },
});
