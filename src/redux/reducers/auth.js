/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const initialState = {
  isLogin: false,
  isLoginWithNumber: false,
  isErrorNumber: false,
  isLoadingNumber: false,
  isSignup: false,
  failSignup: false,
  isError: false,
  isRegistered: false,
  isLoading: false,
  token: '',
  alertMsg: '',
  alertMsgLoginNumber: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'AUTH_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'AUTH_USER_FULFILLED': {
      // console.log(action.payload.data.message);
        // localStorage.setItem('token', action.payload.data.message);
      return {
        ...state,
        token: action.payload.data.message.token,
        isLoading: false,
        isLogin: true,
        isError: false,
        alertMsg: 'Successfully login',
      };
    }
    case 'AUTH_USER_NUMBER_PENDING': {
      return {
        ...state,
        isLoadingNumber: true,
      };
    }
    case 'AUTH_USER_NUMBER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isErrorNumber: true,
        alertMsgLoginNumber: action.payload.response.data.error,
      };
    }
    case 'AUTH_USER_NUMBER_FULFILLED': {
      // console.log(action.payload.data.message);
        // localStorage.setItem('token', action.payload.data.message);
      return {
        ...state,
        token: action.payload.data.message.token,
        isLoadingNumber: false,
        isLoginWithNumber: true,
        isErrorNumber: false,
        alertMsgLoginNumber: 'Successfully login',
      };
    }
    case 'SIGNUP_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SIGNUP_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        failSignup: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'SIGNUP_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSignup: true,
        failSignup: false,
        alertMsg: 'Signup Successfully',
      };
    }
    case 'CHECK_NUMBER_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: '',
      };
    }
    case 'CHECK_NUMBER_REJECTED': {
      return {
        ...state,
        isRegistered: true,
        isLoading: false,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'CHECK_NUMBER_FULFILLED': {
      return {
        ...state,
        isRegistered: false,
        isLoading: false,
        alertMsg: action.payload.data.message,
      };
    }
    case 'persist/PURGE': {
      return {
        ...state,
        isError: false,
        isSignup: false,
        isLogin: false,
        failSignup: false,
        isRegistered: false,
        alertMsg: '',
        alertMsgLoginNumber: '',
        token: '',
        isLoginWithNumber: false,
      };
    }
    case 'persist/REHYDRATE': {
      return {
        ...state,
        // isError: false,
        // isSignup: false,
        // isLogin: false,
        // failSignup: false,
        // isRegistered: false,
        // alertMsg: '',
        // alertMsgLoginNumber: '',
        // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2MjkyOTkxfQ.iuz0AHjQFXhmEh2kgNNl-wrOCQj5e2p8X4vt3arfcIc',
        // isLoginWithNumber: true,
      };
    }
    case 'LOGOUT_USER': {
      //   localStorage.removeItem('token');
      return {
        isError: false,
        isSignup: false,
        isLogin: false,
        failSignup: false,
        isRegistered: false,
        alertMsg: 'Logout Successfully',
      };
    }
    case 'CLEAR_MESSAGE_AUTH': {
      return {
        ...state,
        alertMsg: '',
        isError: false,
        isSignup: false,
        failSignup: false,
        isRegistered: false,
      };
    }
    case 'CLEAR_MESSAGE_AUTH_EMAIL': {
      return {
        ...state,
        alertMsg: '',
        isError: false,
      };
    }
    default: {
      return state;
    }
  }
};
