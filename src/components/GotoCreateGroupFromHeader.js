import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';

const GotoCreateGroupFromHeader = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CreateGroup')}
      style={{paddingRight: 30}}>
      <Icon name="people" size={18} style={{transform: [{rotate: '0deg'}]}} />
    </TouchableOpacity>
  );
};

export default GotoCreateGroupFromHeader;

const styles = StyleSheet.create({});
