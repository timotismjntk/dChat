import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Thumbnail} from 'native-base';
import moment from 'moment';
// import components
import OptionsModal from '../components/ModalShow';

import chatList from '../API/chatList.json';

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={styles.itemWrap}>
      <TouchableOpacity>
        <Thumbnail source={{uri: item.profile_image}} />
      </TouchableOpacity>
      <View style={styles.itemDetail}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
    <View>
      <Text style={styles.time}>{moment(item.last_sent).format('Ahh:mm')}</Text>
      <Text />
    </View>
  </TouchableOpacity>
);

const Home = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
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
      <OptionsModal open={openModal} close={() => setOpenModal(false)} />
      <View style={styles.wrapperShowModal}>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => {
            setOpenModal(true);
          }}>
          <Icon name={!openModal ? 'plus' : 'times'} size={25} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    // flex: 1,
    padding: 20,
    paddingTop: 10,
    position: 'relative',
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
    backgroundColor: '#0ac578',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginRight: 15,
    zIndex: 5,
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
