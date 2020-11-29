/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Thumbnail} from 'native-base';
import LoadingModal from '../components/LoadingModal';
import {CheckBox} from 'react-native-btr';
import account from '../assets/account.jpg';
import {API_URL} from '@env';

// import action
import contactAction from '../redux/actions/contact';

const StartNewChat = (props) => {
  const [isSelected, setSelected] = useState(false);
  const [id, setId] = useState(null);
  const navigateTo = () =>
    props.navigation.navigate('ChatDetail', {
      id: Number(id),
    });

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const {id: userId} = jwt_decode(token);

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity
      style={[styles.item, style]}
      onPress={() => setSelected('')}>
      <View style={styles.itemWrap}>
        <TouchableOpacity>
          <Thumbnail
            small
            source={
              item.Friend.id !== userId
                ? item.Friend.profile_image
                  ? {uri: API_URL + item.Friend.profile_image}
                  : account
                : item.Self.profile_image
                ? {uri: API_URL + item.Self.profile_image}
                : account
            }
          />
        </TouchableOpacity>
        <View style={styles.itemDetail}>
          <Text style={styles.name}>
            {item.Friend.id !== userId
              ? item.Friend.username
              : item.Self.username}
          </Text>
          {/* <Text style={styles.status_message}>{item.status_message}</Text> */}
        </View>
      </View>
      <CheckBox
        checked={
          item.Friend.id !== userId
            ? item.Friend.id === isSelected
            : item.Self.id === isSelected
        }
        onPress={() => {
          setSelected(
            item.Friend.id !== userId ? item.Friend.id : item.Self.id,
          );
          setId(item.Friend.id !== userId ? item.Friend.id : item.Self.id);
        }}
        size={17}
        color="#13a538"
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    dispatch(contactAction.listFriend(token));
  }, [dispatch, token]);

  const [data, setData] = useState([]);
  const contactState = useSelector((state) => state.contact);
  const {listContact} = contactState;

  useEffect(() => {
    if (listContact) {
      setData(listContact.results);
    }
  }, [listContact]);

  return (
    <>
      <LoadingModal />
      <View style={styles.parent}>
        <View style={styles.searchBar}>
          <Icon name="search" size={12} color="grey" />
          <TextInput
            placeholder="Cari dengan Nama"
            style={styles.searchInput}
          />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={data}
            renderItem={Item}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingTop: 10,
              //   justifyContent: 'space-between',
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View
        style={[
          styles.btnCreateConversation,
          isSelected && {backgroundColor: '#13a538'},
        ]}>
        <TouchableOpacity
          disabled={!isSelected && true}
          onPress={navigateTo}
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            Obrolan {isSelected && '(1)'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default StartNewChat;

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
    borderBottomWidth: 0.3,
    borderColor: 'grey',
    paddingVertical: 0,
  },
  searchInput: {
    // flex: 1,
    height: 40,
    fontStyle: 'italic',
    paddingLeft: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemDetail: {
    marginLeft: 15,
  },
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
  },
  status_message: {
    fontSize: 9,
    color: 'grey',
  },
  btnCreateConversation: {
    backgroundColor: '#bfbfbf',
    padding: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
