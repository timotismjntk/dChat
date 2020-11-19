import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

// Import Screens
import Welcome from './src/screens/Welcome';
import StepOne from './src/screens/StepOne';
import StepTwo from './src/screens/StepTwo';
import EnterOldPhone from './src/screens/EnterOldPhone';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StepTwo />
        </PersistGate>
      </Provider>
    );
  }
}
