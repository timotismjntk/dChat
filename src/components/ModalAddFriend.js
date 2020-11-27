import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
  Alert,
} from 'react-native';
import {Thumbnail} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';

import account from '../assets/account.jpg';

// import action
import contactAction from '../redux/actions/contact';

const ModalAddFriend = (props) => {
  const navigation = useNavigation();
  const {open, close, profileImage, userName} = props;
  const [modalVisible, setModalVisible] = useState(open);

  const navigateToDetailChat = () => {
    // this come from home screen props
    props.navigation();
    setModalVisible(close);
  };
  const dispatch = useDispatch();
  const contactState = useSelector((state) => state.contact);
  const {alertMsg} = contactState;
  const addFriend = () => {
    props.addFriend();
    dispatch(contactAction.clearMessages());
    setModalVisible(close);
  };

  const navigateToPreviewProfileImage = () => {
    navigation.navigate('PreviewProfileImage', {
      profileImage: profileImage,
    });
    setModalVisible(close);
  };

  useEffect(() => {
    if (open === true) {
      setModalVisible(open);
    } else if (open === false) {
      setModalVisible(open);
    }
  }, [open, props]);
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={false}
      transparent={true}
      onRequestClose={() => setModalVisible(close)}
      visible={modalVisible}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modal}
        onPress={() => setModalVisible(close)}>
        <TouchableHighlight style={styles.modalWrapper}>
          <View style={styles.modalBody}>
            <TouchableOpacity onPress={navigateToPreviewProfileImage}>
              <Thumbnail
                large
                source={profileImage ? {uri: profileImage} : account}
              />
            </TouchableOpacity>
            <View style={styles.detail}>
              <Text style={styles.name}>{userName}</Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity
                onPress={addFriend}
                style={styles.optionWrapper}>
                <Icon name="user-plus" size={18} />
                <Text>Tambah</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalAddFriend;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 40,
    paddingHorizontal: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalWrapper: {
    width: '100%',
    backgroundColor: 'white',
  },
  modalBody: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 40,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 60,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.6,
    borderColor: 'grey',
    width: '100%',
    padding: 10,
    paddingBottom: 0,
  },
  optionWrapper: {
    alignItems: 'center',
  },
});
