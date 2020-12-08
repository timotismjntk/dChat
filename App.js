import React, {Component, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RootSiblingParent} from 'react-native-root-siblings';

// Import Screens
import Root from './src/screens/Root';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <Root />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
