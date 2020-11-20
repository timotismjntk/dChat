import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Devices = () => {
  return (
    <View style={styles.container}>
      <Text>
        Jika Anda merasa tidak sedang login, silakan{'\n'}
        logout terlebih dahulu, lalu ubah kata sandi{'\n'}Anda.
      </Text>
    </View>
  );
};

export default Devices;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 10,
    backgroundColor: 'white',
    flex: 1,
  },
});
