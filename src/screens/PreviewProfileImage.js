import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import account from '../assets/account.jpg';

const PreviewProfileImage = ({route, navigation}) => {
  const {profileImage} = route.params;
  return (
    <View style={styles.container}>
      <Image
        source={profileImage ? {uri: profileImage} : account}
        style={styles.image}
      />
    </View>
  );
};

export default PreviewProfileImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: 350,
  },
});
