import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  TextInput,
  View,
  Keyboard,
  Alert,
} from 'react-native';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import {Thumbnail} from 'native-base';
import LoadingModal from '../components/LoadingModal';
import account from '../assets/account.jpg';
import {API_URL} from '@env';

import EmojiSelector, {Categories} from 'react-native-emoji-selector';
// import action
import messageAction from '../redux/actions/messages';

import socket from '../helpers/socket';

const ChatDetail = ({route}) => {
  const [showRightNavIconOption, setShowRightNavIconOption] = useState(false);
  const [hideDate, setHideDate] = useState(false);
  const [turnNotifications, setTurnNotifications] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectEmoticon, setSelectEmoticon] = useState(false);
  const dispatch = useDispatch();
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
  // to hide the bottomsheet when keyboard show
  const _keyboardDidShow = () => {
    setShowBottomSheet(false);
    setSelectEmoticon(false);
  };

  const chatId = route.params.id;
  const token = useSelector((state) => state.auth.token);
  const {id} = jwt_decode(token);
  const [msgInput, setMsgInput] = useState('');

  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    dispatch(messageAction.getMessageById(token, chatId)).catch((e) => {
      console.log(e.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on(id.toString(), () => {
      console.log('loaded');
      dispatch(messageAction.getMessageById(token, chatId)).catch((e) => {
        console.log(e.message);
      });
    });
    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataMessageState = useSelector((state) => state.messages);
  const {detailMessage, isMessageSent, isLoading} = dataMessageState;
  useEffect(() => {
    if (detailMessage.results && !isLoading) {
      setUsername(detailMessage.results.friendContact.username);
      setDate(detailMessage.results.friendContact.last_active);
      setData(detailMessage.results.chatMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailMessage.results, isLoading]);

  const refreshMessage = () => {
    dispatch(messageAction.getMessageById(token, chatId)).catch((e) => {
      console.log(e.message);
    });
  };

  const sendMessage = (recipient) => {
    const dataMessage = {
      recipient_id: recipient,
      content: msgInput,
    };
    Keyboard.dismiss();
    dispatch(messageAction.sendMessage(token, dataMessage)).catch((e) => {
      console.log(e.message);
    });
  };

  useEffect(() => {
    if (isMessageSent) {
      dispatch(messageAction.getMessageById(token, chatId)).catch((e) => {
        console.log(e.message);
      });
      dispatch(messageAction.clearMessages());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMessageSent]);

  const moreMessage = () => {
    if (detailMessage.pageInfo.nextLink) {
      const nextPage = detailMessage.pageInfo.currentPage + 1;
      dispatch(messageAction.getMessageById(token, chatId, nextPage)).catch(
        (e) => {
          console.log(e.message);
        },
      );
    }
  };
  useEffect(() => {
    if (detailMessage.pageInfo) {
      if (detailMessage.pageInfo.currentPage > 1) {
        const newDataLoaded = data.concat(detailMessage.results.chatMessage);
        setData(newDataLoaded);
        console.log(data);
      } else {
        setData(detailMessage.results.chatMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailMessage.pageInfo]);

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.item, style]}
      onPress={() => {
        setShowBottomSheet(false);
        setSelectEmoticon(false);
      }}>
      {item.recipient_id !== id && (
        <View style={[styles.messageWrap, {justifyContent: 'flex-end'}]}>
          <Text style={[styles.last_sent, {paddingRight: 5}]}>
            {moment(item.createdAt).format('hh:mm A')}
          </Text>
          <TouchableOpacity
            style={[styles.message, {backgroundColor: '#00B900'}]}>
            <Text style={{color: 'white'}}>{item.content}</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.recipient_id === id && (
        <View style={styles.messageWrap}>
          <TouchableOpacity>
            <Thumbnail
              small
              source={
                detailMessage.results.friendContact.profile_image
                  ? {
                      uri:
                        API_URL +
                        detailMessage.results.friendContact.profile_image,
                    }
                  : account
              }
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.message, {marginLeft: 10}]}>
            <Text>{item.content}</Text>
          </TouchableOpacity>
          <Text style={[styles.last_sent, {paddingLeft: 5}]}>
            {moment(item.createdAt).format('hh:mm A')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <LoadingModal />
      <View style={styles.topNav}>
        <Text style={styles.name}>{username.length > 0 ? username : ''}</Text>
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
      {!hideDate && detailMessage.results && (
        <View style={styles.date}>
          <Text style={{color: 'grey'}}>
            Last seen
            {moment(date).format(' hh:mm (D/M/Y)')}
          </Text>
        </View>
      )}
      <View
        style={{
          padding: 15,
          paddingBottom: 0,
          flex: 1,
        }}>
        <FlatList
          inverted
          data={data}
          renderItem={Item}
          refreshing={isLoading}
          onRefresh={refreshMessage}
          keyExtractor={(item) => item.id.toString()}
          //   contentContainerStyle={{paddingTop: 10}}
          showsVerticalScrollIndicator={false}
          onEndReached={moreMessage}
          onEndReachedThreshold={0.6}
        />
      </View>
      <View style={styles.bottomTabs}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setShowBottomSheet(true);
              setSelectEmoticon(false);
              Keyboard.dismiss();
            }}>
            <Icon name="plus" size={25} style={{marginRight: 10}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectEmoticon(!selectEmoticon);
              setShowBottomSheet(false);
              Keyboard.dismiss();
            }}>
            <Icon name={!selectEmoticon ? 'smile' : 'keyboard'} size={25} />
          </TouchableOpacity>
        </View>
        <TextInput
          multiline={true}
          style={styles.inputMessage}
          value={msgInput}
          onChangeText={(text) => setMsgInput(text)}
        />
        <TouchableOpacity
          disabled={msgInput.length > 0 ? false : true}
          onPress={() => {
            sendMessage(detailMessage.results.friendContact.id);
            setMsgInput('');
          }}>
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
      {selectEmoticon && (
        <EmojiSelector
          style={{borderTopWidth: 0.6, borderColor: 'grey', height: 250}}
          // category={Categories.all}
          onEmojiSelected={(emoji) => setMsgInput(msgInput + emoji)}
          // showTabs={false}
          columns={10}
          showSearchBar={false}
          // showHistory={false}
          // showSectionTitles={false}
        />
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
    paddingBottom: 0,
    paddingTop: 10,
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
    alignItems: 'center',
    // flex: 1,
    // backgroundColor: 'red',
    marginTop: 5,
    marginBottom: 12,
  },
  last_sent: {
    color: 'grey',
    fontSize: 11,
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
