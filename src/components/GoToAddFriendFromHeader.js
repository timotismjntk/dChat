import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';

const GoToAddFriendFromHeader = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('AddFriend')}
      style={{paddingRight: 30}}>
      <Icon
        name="user-follow"
        size={18}
        style={{transform: [{rotate: '0deg'}]}}
      />
    </TouchableOpacity>
  );
};

export default GoToAddFriendFromHeader;

const styles = StyleSheet.create({});
