import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RootSiblingParent} from 'react-native-root-siblings';

// Import Screens
import Root from './src/screens/Root';
export default class App extends Component {
  render() {
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
}
