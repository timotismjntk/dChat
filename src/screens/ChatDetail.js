import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  View,
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

  // to hide date after 5 min.
  setTimeout(() => {
    setHideDate(true);
  }, 50000);

  return (
    <>
      <View style={styles.topNav}>
        <Text style={styles.name}>{detailChat.receiver_detail.name}</Text>
        <View style={styles.rightNav}>
          <TouchableOpacity style={styles.rightNavIcon}>
            <Icon name="phone" size={15} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightNavIcon}>
            <Icon name="clipboard" size={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightNavIcon}
            onPress={() => setShowRightNavIconOption(!showRightNavIconOption)}>
            <Icon name="ellipsis-v" size={15} />
          </TouchableOpacity>
        </View>
      </View>
      {!hideDate && (
        <View style={styles.date}>
          <Text>11. 19. (Kam)</Text>
        </View>
      )}
      <View style={{padding: 15, flex: 1}}>
        <FlatList
          data={detailChat.data}
          renderItem={Item}
          keyExtractor={(item) => item.id.toString()}
          //   contentContainerStyle={{paddingTop: 10}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View>
          <Text>test</Text>
      </View>
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
});
