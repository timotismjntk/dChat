import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import {Thumbnail} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';

import account from '../assets/account.jpg';

const ModalShowOtherUserPreview = (props) => {
  const navigation = useNavigation();
  const {open, close, profileImage, userName} = props;
  const [modalVisible, setModalVisible] = useState(open);

  const navigateToDetailChat = () => {
    // this come from home screen props
    props.navigation();
    setModalVisible(close);
  };

  const navigateToPreviewProfileImage = () => {
    navigation.navigate('PreviewProfileImage', {
      profileImage: profileImage,
    });
    setModalVisible(close);
  };

  useEffect(() => {
    console.log(props.navigation);
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
                source={profileImage ? {uri: API_URL + profileImage} : account}
              />
            </TouchableOpacity>
            <View style={styles.detail}>
              <Text style={styles.name}>{userName}</Text>
              <EvilIcons name="pencil" size={25} color="grey" />
            </View>
            <View style={styles.options}>
              <TouchableOpacity
                onPress={navigateToDetailChat}
                style={styles.optionWrapper}>
                <SimpleIcon name="bubble" size={20} color="black" />
                <Text>Obrolan</Text>
              </TouchableOpacity>
              <View style={styles.optionWrapper}>
                <Icon
                  name="phone"
                  size={20}
                  style={{transform: [{rotate: '100deg'}]}}
                  color="black"
                />
                <Text>Panggilan Suara</Text>
              </View>
              <View style={styles.optionWrapper}>
                <Icon name="video" size={20} />
                <Text>Panggilan Video</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalShowOtherUserPreview;

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
    justifyContent: 'space-between',
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
