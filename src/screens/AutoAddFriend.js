/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

// import action
import authAction from '../redux/actions/auth';

const AutoAddFriend = (props) => {
  const [selected1, setSelected1] = useState(true);
  const [selected2, setSelected2] = useState(true);
  const dispatch = useDispatch();

  const {phone_number, password} = props.route.params;

  useEffect(() => {
    dispatch(authAction.loginNumber(phone_number, password)).catch((e) => {
      console.log(e.message);
    });
  }, [dispatch, password, phone_number]);

  const navigateTo = () => {
    dispatch(authAction.clearMessageAuth());
    setTimeout(() => {
      props.navigation.navigate('Home');
    }, 1800);
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Pengaturan Tambah{'\n'}Teman</Text>
        <View style={styles.wrapper}>
          <Text style={styles.info}>
            Nyalakan pengaturan berikut untuk{'\n'}
            mengizinkan d•Chat menggunakan no.{'\n'}
            telepon dan kontak perangkat Anda{'\n'}
            untuk menambahkan teman.{'\n'}
            Ketuk Pengaturan untuk detail{'\n'}
            selengkapnya.
          </Text>
        </View>
        <View>
          <View style={styles.checkContainer}>
            <TouchableOpacity
              style={[
                styles.btnCheck,
                selected1 && {backgroundColor: '#00B900'},
              ]}
              onPress={() => setSelected1(!selected1)}>
              <Icon name="check" color="white" size={12} />
            </TouchableOpacity>
            <Text style={styles.checktext}>Tambah Teman Otomatis</Text>
          </View>
          <View style={styles.checkContainer}>
            <TouchableOpacity
              style={[
                styles.btnCheck,
                selected2 && {backgroundColor: '#00B900'},
              ]}
              onPress={() => setSelected2(!selected2)}>
              <Icon name="check" color="white" size={12} />
            </TouchableOpacity>
            <Text style={styles.checktext}>Izinkan Orang Menambahkan</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: 'flex-end',
          padding: 20,
        }}>
        <TouchableOpacity
          onPress={navigateTo}
          style={[styles.btn, {backgroundColor: '#00B900'}]}>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AutoAddFriend;

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
  checkContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  btnCheck: {
    backgroundColor: '#a5acaf',
    width: 25,
    height: 25,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  checktext: {
    fontSize: 17,
    marginLeft: 10,
  },
  btn: {
    backgroundColor: '#a5acaf',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
