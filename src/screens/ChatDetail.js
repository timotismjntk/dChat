import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import {Thumbnail} from 'native-base';

import detailChat from '../API/detailChat.json';

const Item = ({item, onPress, style}) => (
  <View style={[styles.item, style]}>
    {item.sender_message && (
      <View style={[styles.messageWrap, {justifyContent: 'flex-end'}]}>
        <TouchableOpacity
          style={[styles.message, {backgroundColor: '#0ac578'}]}>
          <Text style={{color: 'white'}}>{item.sender_message}</Text>
        </TouchableOpacity>
      </View>
    )}
    {item.receiver_message && (
      <View style={styles.messageWrap}>
        <TouchableOpacity>
          <Thumbnail
            small
            source={{uri: detailChat.receiver_detail.profile_image}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.message, {marginLeft: 10}]}>
          <Text>{item.receiver_message}</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const ChatDetail = () => {
  const [showRightNavIconOption, setShowRightNavIconOption] = useState(false);
  const [hideDate, setHideDate] = useState(false);
  const [turnNotifications, setTurnNotifications] = useState(false);
  const [msgInput, setMsgInput] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  // to hide date after 5 min.
  setTimeout(() => {
    setHideDate(true);
  }, 50000);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
    };
  }, []);
  // to hide the bottomsheet when keyboar show
  const _keyboardDidShow = () => {
    setShowBottomSheet(false);
  };

  return (
    <>
      <View style={styles.topNav}>
        <Text style={styles.name}>{detailChat.receiver_detail.name}</Text>
        <View style={styles.rightNav}>
          <TouchableOpacity style={styles.rightNavIcon}>
            <Icon
              name="phone"
              size={18}
              style={{transform: [{rotate: '100deg'}]}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightNavIcon}>
            <Icon name="clipboard" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightNavIcon}
            onPress={() => setShowRightNavIconOption(!showRightNavIconOption)}>
            <Icon name="ellipsis-v" size={18} />
          </TouchableOpacity>
        </View>
      </View>
      {!hideDate && (
        <View style={styles.date}>
          <Text>11. 19. (Kam)</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setShowBottomSheet(false)}
        activeOpacity={1}
        style={{padding: 15, paddingBottom: 0, flex: 1}}>
        <FlatList
          data={detailChat.data}
          renderItem={Item}
          keyExtractor={(item) => item.id.toString()}
          //   contentContainerStyle={{paddingTop: 10}}
          showsVerticalScrollIndicator={false}
        />
      </TouchableOpacity>
      <View style={styles.bottomTabs}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setShowBottomSheet(true);
              Keyboard.dismiss();
            }}>
            <Icon name="plus" size={25} style={{marginRight: 10}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="smile" size={25} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.inputMessage}
          value={msgInput}
          onChangeText={(text) => setMsgInput(text)}
        />
        <TouchableOpacity>
          <Icon
            name={msgInput.length > 0 ? 'telegram-plane' : 'microphone-alt'}
            size={25}
            style={msgInput.length > 0 && {transform: [{rotate: '45deg'}]}}
          />
        </TouchableOpacity>
      </View>
      {showBottomSheet && (
        <View style={styles.bottomSheetCustom}>
          <View>
            <TouchableOpacity style={styles.bottomSheetCustomItem}>
              <Icon name="images" size={25} />
              <Text>Pilih Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetCustomItem}>
              <Icon name="id-card" size={25} />
              <Text>Teman</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.bottomSheetCustomItem}>
              <Icon name="camera-retro" size={25} />
              <Text>Ambil Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetCustomItem}>
              <Icon name="folder" size={25} />
              <Text>Berkas</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.bottomSheetCustomItem}>
            <Icon name="film" size={25} />
            <Text>Pilih Video</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="fade"
        statusBarTranslucent={false}
        transparent={true}
        onRequestClose={() =>
          setShowRightNavIconOption(!showRightNavIconOption)
        }
        visible={showRightNavIconOption}>
        <TouchableOpacity
          onPress={() => {
            setShowRightNavIconOption(!showRightNavIconOption);
          }}
          activeOpacity={1}
          style={{flex: 1}}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.modalContent}
              onPress={() => setTurnNotifications(!turnNotifications)}>
              <Icon
                name={turnNotifications ? 'volume-up' : 'volume-mute'}
                size={15}
              />
              <Text style={styles.textModal}>
                Pemberitahuan{'\n'}
                {turnNotifications ? 'Nyala' : 'Mati'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalContent}>
              <Icon name="user-plus" size={15} />
              <Text style={styles.textModal}>Undang</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalContent}>
              <Icon name="images" size={15} />
              <Text style={styles.textModal}>Foto</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default ChatDetail;

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightNavIcon: {
    marginLeft: 25,
  },
  name: {
    fontSize: 20,
  },
  date: {
    paddingLeft: 15,
  },
  modal: {
    width: 180,
    height: 150,
    right: 0,
    top: 45,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1.8,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  modalContent: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  textModal: {
    marginLeft: 15,
    fontSize: 16,
    fontStyle: 'italic',
  },
  messageWrap: {
    flexDirection: 'row',
    // flex: 1,
    // backgroundColor: 'red',
    marginBottom: 10,
  },
  item: {
    marginBottom: 5,
  },
  message: {
    backgroundColor: '#a5acaf',
    maxWidth: '80%',
    minWidth: '15%',
    padding: 15,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  inputMessage: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bottomSheetCustom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'grey',
    padding: 20,
    paddingHorizontal: 30,
    flex: 1,
  },
  bottomSheetCustomItem: {
    marginBottom: 25,
    alignItems: 'center',
    // marginRight: 20,
    // marginLeft: 10,
    // backgroundColor: 'green',
  },
});
