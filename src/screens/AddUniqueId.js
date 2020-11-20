import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/EvilIcons';

const AddUniqueId = () => {
  const [uniqueId, setUniqueId] = useState('');
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            uniqueId.length > 0 && {
              borderColor: '#0ac578',
              borderBottomWidth: 0.7,
            },
          ]}
          maxLength={20}
          onChangeText={(text) => setUniqueId(text)}
          value={uniqueId}
          autoFocus={true}
        />
        {uniqueId.length > 0 && (
          <TouchableOpacity
            style={styles.btnClear}
            onPress={() => setUniqueId('')}>
            <Ionicons name="close" size={20} color="grey" />
          </TouchableOpacity>
        )}
        <Text style={[styles.inputInfo]}>
          Atur ID d•Chat Anda.{'\n'}Setelah diatur, ID tidak dapat di ubah.
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            uniqueId.length >= 4 && {backgroundColor: '#0ac578'},
          ]}
          disabled={uniqueId.length >= 4 ? false : true}>
          <Text style={styles.submittext}>Periksa</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddUniqueId;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
  input: {
    borderBottomWidth: 0.4,
    borderColor: 'grey',
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  inputInfo: {
    color: 'grey',
    marginTop: 10,
  },
  btnClear: {
    position: 'absolute',
    top: 40,
    right: 22,
  },
  submitButton: {
    backgroundColor: 'grey',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submittext: {
    color: 'white',
    fontSize: 16,
  },
});
