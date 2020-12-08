import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {Thumbnail} from 'native-base';
import {persistor} from '../redux/store';
import account from '../assets/account.jpg';
import listFriendIcon from '../assets/listFriendIcon.png';
import Feather from 'react-native-vector-icons/Feather';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoadingModal from '../components/LoadingModal';
import AlertToasts from '../components/AlertToasts';
import userAction from '../redux/actions/user';
import deviceAction from '../redux/actions/device';
import authAction from '../redux/actions/auth';
import {API_URL} from '@env';

const SettingAccount = (props) => {
  const [items, setItems] = useState('');
  const [errorToast, setErrorToast] = useState('');
  const [show, setShow] = useState(false);

  const navigateToUserProfile = () => {
    props.navigation.navigate('UserProfile');
  };
  const navigateToAccount = () => {
    props.navigation.navigate('ProfileDetail');
  };
  const navigateToListFriend = () => {
    props.navigation.navigate('Friend');
  };
  const navigateToStartNewChat = () => {
    props.navigation.navigate('StartNewChat');
  };

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(userAction.getProfile(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [userData, setUserData] = useState([]);

  const userState = useSelector((state) => state.user);
  const {data, isLoading, isError} = userState;

  useEffect(() => {
    if (data.results && !isLoading) {
      setUserData(data.results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.results]);

  const [signoutLoading, setSignoutLoading] = useState(false);

  const signOut = async () => {
    setSignoutLoading(true);
    try {
      setSignoutLoading(false);
      setErrorToast('Signout now');
      setShow(true);
      setTimeout(async () => {
        setShow(false);
        await persistor.purge();
        await persistor.purge();
        await persistor.flush();
        await dispatch(deviceAction.removeDeviceToken(token));
        // await dispatch(deviceAction.setDeviceTokenToStateRedux(''));
        await dispatch(authAction.logout());
      }, 1000);
    } catch (e) {}
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LoadingModal duration={2000} />
      <LoadingModal requestLoading={signoutLoading} />
      <AlertToasts visible={show} message={errorToast} />
      <View>
        <TouchableOpacity style={styles.header} onPress={navigateToUserProfile}>
          <Thumbnail
            large
            source={
              userData
                ? userData.profile_image
                  ? {uri: API_URL + userData.profile_image}
                  : account
                : account
            }
          />
          <View style={styles.upperContainer}>
            <Text style={styles.name}>{userData ? userData.username : ''}</Text>
            <View style={styles.userId}>
              <Text style={styles.Id}>ID Pengguna:</Text>
              <Text style={styles.unique_id}>
                {userData
                  ? userData.unique_id !== null
                    ? userData.unique_id
                    : 'Belum Diatur'
                  : 'Belum Diatur'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.listItemWrapper}>
          <TouchableOpacity
            onPress={navigateToUserProfile}
            style={styles.listItem}>
            <SimpleIcon name="user" size={16} />
            <Text style={styles.listItemText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToAccount} style={styles.listItem}>
            <Feather name="clipboard" size={16} />
            <Text style={styles.listItemText}>Akun</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <SimpleIcon name="volume-2" size={16} />
            <Text style={styles.listItemText}>Pemberitahuan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPress={navigateToStartNewChat}>
            <SimpleIcon name="bubbles" size={16} />
            <Text style={styles.listItemText}>Obrolan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <SimpleIcon name="phone" size={16} />
            <Text style={styles.listItemText}>Panggilan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPress={navigateToListFriend}>
            <Image source={listFriendIcon} style={{width: 16}} />
            <Text style={styles.listItemText}>Teman</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <SimpleIcon name="emotsmile" size={16} />
            <Text style={styles.listItemText}>Stiker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <FontAwesome5 name="bullhorn" size={14} color="grey" />
            <Text style={styles.listItemText}>Pengumuman</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <EvilIcons name="question" size={16.5} />
            <Text style={styles.listItemText}>Bantuan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <EvilIcons name="exclamation" size={16.5} />
            <Text style={styles.listItemText}>Tentang d•Chat </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <FontAwesome5 name="download" size={16} color="grey" />
            <Text style={styles.listItemText}>Unduh d•Chat Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={signOut}>
            <FontAwesome5 name="sign-out-alt" size={16} color="grey" />
            <Text style={styles.listItemText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 8,
    borderBottomWidth: 0.3,
    borderColor: 'grey',
  },
  upperContainer: {
    // flexDirection: 'row',
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
  },
  userId: {
    flexDirection: 'row',
  },
  Id: {
    color: 'grey',
  },
  unique_id: {
    color: '#5851db',
    marginLeft: 5,
  },
  listItemWrapper: {
    padding: 25,
    paddingTop: 15,
    paddingLeft: 20,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 15,
    marginLeft: 20,
  },
});
