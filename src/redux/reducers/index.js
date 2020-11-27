/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

import auth from './auth';
import messages from './messages';
import contact from './contact';
import user from './user';

export default combineReducers({
  auth,
  messages,
  contact,
  user,
});
