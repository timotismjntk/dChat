import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/EvilIcons';

const AddStatusMessage = () => {
  const [statusMessage, setStatusMessage] = useState('');
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            statusMessage.length > 0 && {
              borderColor: '#0ac578',
              borderBottomWidth: 0.7,
            },
          ]}
          maxLength={500}
          multiline={true}
          onChangeText={(text) => setStatusMessage(text)}
          value={statusMessage}
          autoFocus={true}
        />
        {statusMessage.length > 0 && (
          <TouchableOpacity
            style={styles.btnClear}
            onPress={() => setStatusMessage('')}>
            <Ionicons name="close" size={20} color="grey" />
          </TouchableOpacity>
        )}
        <Text style={styles.inputCount}>{statusMessage.length}/500</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submittext}>OK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddStatusMessage;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
  input: {
    borderBottomWidth: 0.3,
    borderColor: 'grey',
    paddingVertical: 5,
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
    backgroundColor: '#0ac578',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submittext: {
    color: 'white',
    fontSize: 16,
  },
});
