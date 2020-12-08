import http from '../../helpers/http';
import qs from 'query-string';

export default {
  setDeviceTokenToStateRedux: (deviceToken) => ({
    type: 'SET_DEVICE_TOKEN',
    payload: deviceToken,
  }),
  setDeviceTokenToDatabase: (data) => ({
    type: 'SAVE_DEVICE_TO_DB',
    payload: http().patch('device/add', qs.stringify(data)),
  }),
  removeDeviceToken: (token) => ({
    type: 'REMOVE_DEVICE_TOKEN',
    payload: http(token).get('device/remove'),
  }),
};
