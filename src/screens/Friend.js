import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import {Thumbnail} from 'native-base';

import userProfile from '../API/userProfile.json';

const Friend = (props) => {
  const [hide, setHide] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <View style={styles.parent}>
      <View
        style={[
          styles.searchBar,
          search.length > 0 && {borderColor: '#00B900', borderBottomWidth: 1},
        ]}>
        <Icon name="search" size={12} color="grey" />
        <TextInput
          placeholder="Cari dengan Nama"
          style={styles.searchInput}
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        {search.length > 0 && (
          <TouchableOpacity
            style={styles.btnClear}
            onPress={() => setSearch('')}>
            <Icon name="times" size={20} color="#a5acaf" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={() => setHide(!hide)}
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Teman 1</Text>
        <SimpleIcon name={!hide ? 'arrow-up' : 'arrow-down'} size={12} />
      </TouchableOpacity>
      {!hide && (
        <View style={styles.verified}>
          <Thumbnail
            small
            source={{
              uri:
                'data:image/jpeg;base64,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',
            }}
          />
          <Text style={styles.verified_Account_name}>Akun Resmi</Text>
          <Icon name="chevron-right" size={13} color="rgba(0,0,0, 0.5)" />
        </View>
      )}
    </View>
  );
};

export default Friend;

const styles = StyleSheet.create({
  parent: {
    padding: 15,
    paddingVertical: 0,
    backgroundColor: 'white',
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    paddingVertical: 0,
    marginBottom: 5,
  },
  searchInput: {
    // flex: 1,
    height: 40,
    fontStyle: 'italic',
    paddingLeft: 8,
  },
  btnClear: {
    position: 'absolute',
    top: 12,
    right: 0,
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  verified_Account_name: {
    marginLeft: 10,
    marginRight: 10,
  },
});
