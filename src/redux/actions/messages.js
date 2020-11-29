import http from '../../helpers/http';
import qs from 'query-string';

export default {
  listMessage: (token, page = 1) => ({
    type: 'GET_MESSAGE',
    payload: http(token).get(`message?page=${Number(page)}`),
  }),
  getMessageById: (token, recieptId, page = 0) => ({
    type: 'GET_MESSAGE_BY_ID',
    payload: http(token).get(`message/${recieptId}?page=${Number(page)}`),
  }),
  sendMessage: (token, message) => ({
    type: 'POST_MESSAGE',
    payload: http(token).post('message', qs.stringify(message)),
  }),
  clearMessages: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
