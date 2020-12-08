/* eslint-disable prettier/prettier */
import http from '../../helpers/http';
import qs from 'query-string';


export default {
  signUp: (data) => ({
    type: 'SIGNUP_USER',
    payload: http().post('auth/signup/phone/', data),
  }),
  signUpWithoutPicture: (data) => ({
    type: 'SIGNUP_USER',
    payload: http().post('auth/signup/phone/', qs.stringify(data)),
  }),
  login: (email, password, deviceToken) => ({
    type: 'AUTH_USER',
    payload: http().post('auth/login/', qs.stringify({email, password, deviceToken})),
  }),
  loginNumber: (phone, password) => ({
    type: 'AUTH_USER_NUMBER',
    payload: http().post('auth/login/phone', qs.stringify({phone_number: phone, password: password})),
  }),
  checkNumber: (phone) => ({
    type: 'CHECK_NUMBER',
    payload: http().post('auth/check', qs.stringify({phone_number: phone})),
  }),
  getResetCode: (email) => ({
    type: 'GET_RESET_CODE',
    payload: http().post('auth/reset', qs.stringify({email})),
  }),
  verifyResetCode: (email, reset_code) => ({
    type: 'VERIFY_RESET_CODE',
    payload: http().post('auth/verify/reset', qs.stringify({email, reset_code})),
  }),
  checkTokenExpired: (token) => ({
    type: 'CHECK_REFRESH_TOKEN',
    payload: http(token).post('auth/verify/token'),
  }),
  logout: () => ({
    type: 'LOGOUT_USER',
  }),
  clearMessageAuth: () => ({
    type: 'CLEAR_MESSAGE_AUTH',
  }),
  clearMessageLoginByEmail: () => ({
    type: 'CLEAR_MESSAGE_AUTH_EMAIL',
  }),
  // setToken: (payload) => ({
  //   type: 'persist/REHYDRATED',
  //   payload,
  // }),
};
