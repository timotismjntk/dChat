import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
} from 'react-native';
import logo from '../assets/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Thumbnail} from 'native-base';
import account from '../assets/account.jpg';

// import component
import ModalAddFriend from '../components/ModalAddFriend';

// import action
import contactAction from '../redux/actions/contact';

import userProfile from '../API/userProfile.json';

const AddFriend = (props) => {
  const [search, setSearch] = useState('');
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const [openModalPreviewUser, setOpenModalPreviewUser] = useState(false);
  const [sendImageToComponents, setSendImageToComponents] = useState(''); // this for send image to component when user click image from chat
  const [sendUserNameToComponents, setSendUserNameToComponents] = useState(''); // this for send image to component when user click image from chat

  const token = useSelector((state) => state.auth.token);

  const searchContact = async () => {
    try {
      await dispatch(contactAction.listPublicContact(token, search));
    } catch (err) {
      Alert.alert(err.response.data.message);
    }
  };

  // const [data, setData] = useState([]);
  const contactState = useSelector((state) => state.contact);
  const {publicContact, isAdded, isLoading, alertMsg, isError} = contactState;

  const addFriend = async () => {
    try {
      await dispatch(contactAction.addFriend(token, id));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (isAdded) {
      Alert.alert(alertMsg);
      dispatch(contactAction.clearMessages());
      setOpenModalPreviewUser(false);
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAdded]);

  useEffect(() => {
    if (!isLoading && isError) {
      setOpenModalPreviewUser(false);
      dispatch(contactAction.clearMessages());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  useEffect(() => {
    if (Object.keys(publicContact) && publicContact.id) {
      setId(publicContact.id);
      console.log(publicContact);
      setOpenModalPreviewUser(true);
      setSendImageToComponents(
        publicContact.profile_image && publicContact.profile_image,
      );
      setSendUserNameToComponents(publicContact.username);
    }
  }, [publicContact]);
  return (
    <View style={styles.parent}>
      <View
        style={[
          styles.searchBar,
          search.length > 0 && {borderColor: '#00B900', borderBottomWidth: 1},
        ]}>
        <TouchableOpacity onPress={searchContact}>
          <Icon name="search" size={15} color="grey" />
        </TouchableOpacity>
        <TextInput
          placeholder="Masukkan ID teman"
          style={styles.searchInput}
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        {search.length > 0 && (
          <TouchableOpacity
            style={styles.btnClear}
            onPress={() => {
              setSearch('');
              Keyboard.dismiss();
            }}>
            <Icon name="times" size={20} color="#a5acaf" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title_unique_id}>ID Pengguna:</Text>
        <Text style={styles.unique_id}>
          {userProfile.user_profile.unique_id
            ? userProfile.user_profile.unique_id
            : 'Belum Diatur >'}
        </Text>
      </View>
      <View style={styles.verified}>
        <Thumbnail small source={account} />
        <Text style={styles.verified_Account_name}>Akun Resmi</Text>
        <Icon name="chevron-right" size={13} color="rgba(0,0,0, 0.5)" />
      </View>
      <ModalAddFriend
        navigation={() =>
          props.navigation.navigate('ChatDetail', {
            id: id,
          })
        }
        addFriend={addFriend}
        open={openModalPreviewUser}
        close={() => setOpenModalPreviewUser(false)}
        profileImage={sendImageToComponents}
        userName={sendUserNameToComponents}
      />
    </View>
  );
};

export default AddFriend;

const styles = StyleSheet.create({
  parent: {
    padding: 15,
    paddingVertical: 0,
    backgroundColor: 'white',
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    paddingVertical: 0,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontStyle: 'italic',
    paddingLeft: 8,
  },
  btnClear: {
    position: 'absolute',
    top: 12,
    right: 0,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 5,
  },
  title_unique_id: {
    color: 'grey',
  },
  unique_id: {
    color: '#5851db',
    marginLeft: 5,
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  verified_Account_name: {
    marginLeft: 10,
    marginRight: 10,
  },
});
