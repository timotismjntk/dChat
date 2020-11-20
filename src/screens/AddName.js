import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/EvilIcons';

const AddName = () => {
  const [name, setName] = useState('');
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            name.length > 0 && {borderColor: '#0ac578', borderBottomWidth: 0.7},
          ]}
          maxLength={20}
          onChangeText={(text) => setName(text)}
          value={name}
          autoFocus={true}
        />
        {name.length > 0 && (
          <TouchableOpacity style={styles.btnClear} onPress={() => setName('')}>
            <Ionicons name="close" size={20} color="grey" />
          </TouchableOpacity>
        )}
        <Text style={[styles.inputCount, name.length === 0 && {color: 'red'}]}>
          {name.length}/20
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            name.length > 0 && {backgroundColor: '#0ac578'},
          ]}
          disabled={name.length > 0 ? false : true}>
          <Text style={styles.submittext}>OK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddName;

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
  inputCount: {
    color: 'grey',
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
