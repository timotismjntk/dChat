/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/EvilIcons';
import {Thumbnail, Badge} from 'native-base';
import moment from 'moment';
// import components
import OptionsModal from '../components/ModalShowOptions';
import ModalShowOtherUserPreview from '../components/ModalShowOtherUserPreview';
import {store, persistor} from '../redux/store';

import bear from '../assets/bear.png';
import account from '../assets/account.jpg';

// import action
import messageAction from '../redux/actions/messages';

const Home = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalPreviewUser, setOpenModalPreviewUser] = useState(false);
  const [sendImageToComponents, setSendImageToComponents] = useState(''); // this for send image to component when user click image from chat
  const [sendUserNameToComponents, setSendUserNameToComponents] = useState(''); // this for send image to component when user click image from chat
  const [sendIdToComponents, setSendIdToComponents] = useState(null); // this for
  const dispatch = useDispatch();
  const [dataMessage, setDataMessage] = useState([]);

  const navigateToChatDetail = (id) => {
    props.navigation.navigate('ChatDetail', {id: id});
  };
  const navigateToSettingAccount = () => {
    props.navigation.navigate('SettingAccount');
  };
  const navigateToAddFriend = async () => {
    // try {
    //   await persistor.purge();
    //   await persistor.purge();
    //   await persistor.flush();
    // } catch (e) {}
    props.navigation.navigate('AddFriend');
  };
  const navigateToFriend = () => {
    props.navigation.navigate('Friend');
  };

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(messageAction.listMessage(token)).catch((e) => {
      console.log(e.message);
    });
  }, [dispatch, token]);
  const messageState = useSelector((state) => state.messages);
  const {data} = messageState;
  useEffect(() => {
    if (data) {
      setDataMessage(data.results);
    }
  }, [data]);

  const [requestLoad, setRequestLoad] = useState(false);
  const moreMessage = () => {
    if (data.pageInfo.nextLink) {
      const nextPage = data.pageInfo.currentPage + 1;
      console.log(data.pageInfo);
      setRequestLoad(true);
      dispatch(messageAction.listMessage(token, nextPage)).catch((e) => {
        console.log(e.message);
      });
    } else {
      dispatch(messageAction.listMessage(token)).catch((e) => {
        console.log(e.message);
      });
    }
  };
  useEffect(() => {
    if (requestLoad) {
      if (dataMessage !== data.results) {
        const newDataLoaded = data.concat(data.results);
        setDataMessage(newDataLoaded);
        setRequestLoad(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestLoad, data.results]);

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity
      onPress={() =>
        navigateToChatDetail(
          item.isSendByUser === 'true' ? item.To.id : item.From.id,
        )
      }
      style={[styles.item, style]}>
      <View style={styles.itemWrap}>
        <TouchableOpacity
          onPress={() => {
            setOpenModalPreviewUser(true);
            setSendImageToComponents(item.profile_image);
            setSendUserNameToComponents(item.To.username);
            setSendIdToComponents(item.To.id);
          }}>
          <Thumbnail
            source={item.profile_image ? {uri: item.profile_image} : account}
          />
        </TouchableOpacity>
        <View style={styles.itemDetail}>
          <Text style={styles.name}>
            {item.isSendByUser === 'true'
              ? item.To.username
              : item.From.username}
          </Text>
          <Text style={styles.message}>{item.chat}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.time}>
          {moment(item.last_sent).format('hh:mm A')}
        </Text>
        {item.messageUnread > 0 && (
          <View style={{alignSelf: 'center', justifyContent: 'center'}}>
            <Badge
              success
              style={{
                borderRadius: 35,
                height: 20,
                width: 20,
                paddingTop: 0,
              }}>
              <Text>{item.messageUnread}</Text>
            </Badge>
          </View>
        )}
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
      {dataMessage ? (
        <View style={styles.parent}>
          <FlatList
            data={dataMessage}
            renderItem={Item}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{paddingTop: 10}}
            showsVerticalScrollIndicator={false}
            onEndReached={moreMessage}
            onEndReachedThreshold={0.5}
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <Image
            source={bear}
            style={{width: 140, height: 140, marginBottom: 40}}
          />
          <View style={{position: 'absolute', alignItems: 'center', top: 280}}>
            <Text style={{color: 'rgba(0, 0, 0, 0.7)', fontSize: 17}}>
              Coba tambah teman!
            </Text>
            <TouchableOpacity
              onPress={navigateToAddFriend}
              style={{
                backgroundColor: '#00B900',
                padding: 8,
                paddingHorizontal: 25,
                borderRadius: 3,
                marginTop: 15,
              }}>
              <Text style={{color: 'white', fontSize: 12}}>Tambah Teman</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
          navigation={() =>
            props.navigation.navigate('ChatDetail', {
              id: sendIdToComponents,
            })
          }
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
    paddingTop: 5,
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
    marginBottom: 5,
  },
});
