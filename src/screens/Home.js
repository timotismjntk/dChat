import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/EvilIcons';
import {Thumbnail} from 'native-base';
import moment from 'moment';
// import components
import OptionsModal from '../components/ModalShowOptions';
import ModalShowOtherUserPreview from '../components/ModalShowOtherUserPreview';

import chatList from '../API/chatList.json';

const Home = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalPreviewUser, setOpenModalPreviewUser] = useState(false);
  const [sendImageToComponents, setSendImageToComponents] = useState(''); // this for send image to component when user click image from chat
  const [sendUserNameToComponents, setSendUserNameToComponents] = useState(''); // this for send image to component when user click image from chat

  const navigateToChatDetail = () => props.navigation.navigate('ChatDetail');
  const navigateToSettingAccount = () => {
    props.navigation.navigate('SettingAccount');
  };
  const navigateToAddFriend = () => {
    props.navigation.navigate('AddFriend');
  };
  const navigateToFriend = () => {
    props.navigation.navigate('Friend');
  };

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity
      onPress={navigateToChatDetail}
      style={[styles.item, style]}>
      <View style={styles.itemWrap}>
        <TouchableOpacity
          onPress={() => {
            setOpenModalPreviewUser(true);
            setSendImageToComponents(item.profile_image);
            setSendUserNameToComponents(item.name);
          }}>
          <Thumbnail source={{uri: item.profile_image}} />
        </TouchableOpacity>
        <View style={styles.itemDetail}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.time}>
          {moment(item.last_sent).format('hh:mm A')}
        </Text>
        <Text />
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={styles.topNav}>
        <Text style={styles.brand}>d•Chat</Text>
        <View style={styles.rightNav}>
          <TouchableOpacity style={styles.rightNavIcon}>
            <Icon name="clipboard" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToFriend}
            style={styles.rightNavIcon}>
            <Icon name="user" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToAddFriend}
            style={styles.rightNavIcon}>
            <Icon name="user-plus" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToSettingAccount}
            style={styles.rightNavIcon}>
            <Icon name="cog" size={18} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.parent}>
        {/* <Text>Home</Text> */}
        <FlatList
          data={chatList.data}
          renderItem={Item}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{paddingTop: 10}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.wrapperShowModal}>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => {
            setOpenModal(true);
          }}>
          <Ionicons
            style={!openModal && {transform: [{rotate: '45deg'}]}}
            name={!openModal ? 'close' : 'close'}
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View>
        <OptionsModal
          open={openModal}
          close={() => setOpenModal(false)}
          navigation={() => props.navigation.navigate('StartNewChat')}
        />
        <ModalShowOtherUserPreview
          navigation={() => props.navigation.navigate('ChatDetail')}
          open={openModalPreviewUser}
          close={() => setOpenModalPreviewUser(false)}
          profileImage={sendImageToComponents}
          userName={sendUserNameToComponents}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 0,
    paddingTop: 30,
    backgroundColor: 'white',
    width: '100%',
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightNavIcon: {
    marginLeft: 25,
  },
  brand: {
    color: '#00B900',
    fontWeight: 'bold',
    fontSize: 22,
  },
  parent: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    paddingTop: 10,
    position: 'relative',
    backgroundColor: 'white',
  },
  wrapperShowModal: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // marginBottom: 30,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  openButton: {
    backgroundColor: '#00B900',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginRight: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetail: {
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  message: {
    color: 'grey',
    fontStyle: 'italic',
  },
  time: {
    color: '#848a8c',
    fontStyle: 'italic',
  },
});
