import http from '../../helpers/http';
import qs from 'query-string';

export default {
  listFriend: (token, search = '') => ({
    type: 'GET_LIST_FRIEND',
    payload: http(token).get(`contact?search=${search}`),
  }),
  listPublicContact: (token, search = '') => ({
    type: 'GET_LIST_PUBLIC_CONTACT',
    payload: http(token).get(`contact/public/v1?search=${search}`),
  }),
  addFriend: (token, id) => ({
    type: 'POST_ADD_CONTACT',
    payload: http(token).post(`contact/${Number(id)}`),
  }),
  detailFriendProfile: (token, id) => ({
    type: 'GET_DETAIL_FRIEND',
    payload: http(token).get(`contact/${id}`),
  }),
  clearMessages: () => ({
    type: 'CLEAR_MESSAGE_CONTACT',
  }),
};
