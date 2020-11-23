/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
import {CheckBox} from 'react-native-btr';
import contactList from '../API/contactList.json';

const StartNewChat = (props) => {
  const [isSelected, setSelected] = useState(false);
  const navigateTo = () => props.navigation.navigate('ChatDetail');

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity
      style={[styles.item, style]}
      onPress={() => setSelected('')}>
      <View style={styles.itemWrap}>
        <TouchableOpacity>
          <Thumbnail small source={{uri: item.profile_image}} />
        </TouchableOpacity>
        <View style={styles.itemDetail}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.status_message}>{item.status_message}</Text>
        </View>
      </View>
      <CheckBox
        checked={item.id === isSelected}
        onPress={() => {
          setSelected(item.id);
        }}
        size={17}
        color="#13a538"
      />
    </TouchableOpacity>
  );
  return (
    <>
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
            data={contactList.data}
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
