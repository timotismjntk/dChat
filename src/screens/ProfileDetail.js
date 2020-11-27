/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CheckBox} from 'react-native-btr';

// import action
import userAction from '../redux/actions/user';

const ProfileDetail = (props) => {
  const [isAllowAdd, setIsAllowAdd] = useState(false);
  const [isAllowLogin, setIsAllowLogin] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const navigateToChangePassword = () => {
    props.navigation.navigate('ChangePassword');
  };
  const navigateToDevices = () => {
    props.navigation.navigate('Devices');
  };
  const navigateToQRCode = () => {
    props.navigation.navigate('QRCode');
  };
  const navigateToChangeEmail = () => {
    props.navigation.navigate('ChangeEmail');
  };
  const deleteAccount = () => setShowModalDelete(true);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [userData, setUserData] = useState([]);

  const userState = useSelector((state) => state.user);
  const {data, isLoading, isError, isUploaded, alertMsg} = userState;

  useEffect(() => {
    if (data && !isLoading) {
      setUserData(data.results);
    }
  }, [data, isLoading]);

  const navigateToChangePhoneNumberParent = () => {
    props.navigation.navigate('ChangePhoneNumberParent', {
      phone_number: userData.phone_number,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingLeft: 15}}>
        <TouchableOpacity
          onPress={navigateToChangePhoneNumberParent}
          style={styles.bodyWrapper}>
          <Text style={styles.titlePhone}>Nomor Telepon</Text>
          <Text style={styles.phoneNumber}>
            {userData.phone_number
              ? userData.phone_number
              : userData.phone_number}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bodyWrapper}
          onPress={navigateToChangeEmail}>
          <Text style={styles.titleMessageStatus}>Email</Text>
          <Text style={styles.email}>
            {userData.email ? userData.email : 'Belum Diatur'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToChangePassword}
          style={styles.bodyWrapper}>
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
        <TouchableOpacity
          onPress={navigateToDevices}
          style={styles.bodyWrapper}>
          <Text style={styles.device}>Perangkat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToQRCode} style={styles.bodyWrapper}>
          <Text style={styles.qrCode}>Kode QR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteAccount} style={styles.bodyWrapper}>
          <Text style={styles.deleteAccount}>Hapus Akun</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        statusBarTranslucent={false}
        transparent={true}
        onRequestClose={() => setShowModalDelete(false)}
        visible={showModalDelete}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.warningModalText}>
              Setelah akun dihapus, Anda tidak{'\n'}
              akan dapat memperoleh kembali daftar teman, obrolan, atau riwayat
              pembelian. Yakin ingin melanjutkan?
            </Text>
            <View style={styles.btnModalContainer}>
              <TouchableOpacity
                style={styles.btnModal}
                onPress={() => setShowModalDelete(false)}>
                <Text>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnModal}
                onPress={() => setShowModalDelete(false)}>
                <Text style={{color: '#0ac578'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modal: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 3,
  },
  warningModalText: {
    color: 'grey',
    fontSize: 15,
  },
  btnModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    // width: '40%',
  },
  btnModal: {
    padding: 30,
    paddingTop: 25,
    paddingBottom: 0,
  },
});
