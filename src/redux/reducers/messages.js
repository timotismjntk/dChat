/* eslint-disable prettier/prettier */
const initialState = {
    data: {},
    detailMessage: {},
    isLoading: false,
    isError: false,
    alertMsg: '',
    alertMsgById: '',
    isLoadingMsgById: false,
    isErrorMsgById: false,
    isMessageSent: false,
    alertMsgSent: '',
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_MESSAGE_PENDING': {
        return {
          ...state,
          isLoading: true,
        };
      }
      case 'GET_MESSAGE_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          alertMsg: action.payload.response.data.error,
        };
      }
      case 'GET_MESSAGE_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          alertMsg: action.payload.data.message,
          data: action.payload.data,
          token: '',
          isLoginWithNumber: false,
        };
      }
      case 'GET_MESSAGE_BY_ID_PENDING': {
        return {
          ...state,
          isLoadingMsgById: true,
        };
      }
      case 'GET_MESSAGE_BY_ID_REJECTED': {
        return {
          ...state,
          isLoadingMsgById: false,
          isErrorMsgById: true,
          alertMsgById: action.payload.response.data.error,
        };
      }
      case 'GET_MESSAGE_BY_ID_FULFILLED': {
        return {
          ...state,
          isLoadingMsgById: false,
          alertMsgById: action.payload.data.message,
          detailMessage: action.payload.data,
          isErrorMsgById: false,
        };
      }
      case 'POST_MESSAGE_PENDING': {
        return {
          ...state,
          isLoading: true,
        };
      }
      case 'POST_MESSAGE_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isMessageSent: false,
          alertMsgSent: action.payload.response.data.error,
        };
      }
      case 'POST_MESSAGE_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          isSignup: false,
          isMessageSent: true,
          alertMsgSent: 'Message Send Successfully',
        };
      }
      case 'CLEAR_MESSAGE': {
        return {
          ...state,
          isMessageSent: false,
        };
      }
      case 'persist/PURGE': {
        return {
          data: {},
          detailMessage: {},
          isLoading: false,
          isError: false,
          alertMsg: '',
          alertMsgById: '',
          isLoadingMsgById: false,
          isErrorMsgById: false,
          isMessageSent: false,
          alertMsgSent: '',
        };
      }
      default: {
        return state;
      }
    }
  };
