import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {Thumbnail} from 'native-base';
import account from '../assets/account.jpg';
import listFriendIcon from '../assets/listFriendIcon.png';
import iconPengumuman from '../assets/bullhorn-outline.png';
import Feather from 'react-native-vector-icons/Feather';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import userProfile from '../API/userProfile.json';

const SettingAccount = (props) => {
  const [items, setItems] = useState('');

  const navigateToUserProfile = () => {
    props.navigation.navigate('UserProfile');
  };
  const navigateToAccount = () => {
    props.navigation.navigate('ProfileDetail');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <TouchableOpacity style={styles.header} onPress={navigateToUserProfile}>
          <Thumbnail
            large
            source={
              userProfile.user_profile.profile_image
                ? {uri: userProfile.user_profile.profile_image}
                : account
            }
          />
          <View style={styles.upperContainer}>
            <Text style={styles.name}>{userProfile.user_profile.name}</Text>
            <View style={styles.userId}>
              <Text style={styles.Id}>ID Pengguna:</Text>
              <Text style={styles.unique_id}>
                {userProfile.user_profile.unique_id
                  ? userProfile.user_profile.unique_id
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
          <TouchableOpacity style={styles.listItem}>
            <SimpleIcon name="bubbles" size={16} />
            <Text style={styles.listItemText}>Obrolan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <SimpleIcon name="phone" size={16} />
            <Text style={styles.listItemText}>Panggilan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
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
    paddingVertical: 20,
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
