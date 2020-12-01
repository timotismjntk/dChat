import http from '../../helpers/http';
import qs from 'query-string';

export default {
  setDeviceTokenToStateRedux: (deviceToken) => {
    return {
      type: 'SET_DEVICE_TOKEN',
      payload: deviceToken,
    };
  },
  registerDevices: (token, deviceToken) => {
    return {
      type: 'REGISTER_DEVICE',
      payload: http(token).post(
        'register/devices',
        qs.stringify({deviceToken: deviceToken}),
      ),
    };
  },
};
