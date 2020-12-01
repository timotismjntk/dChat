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
  resetCodeData: {},
  isVerify: false,
  isErrorVerify: false,
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
        isErrorNumber: true,
        isLoadingNumber: false,
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
    case 'GET_RESET_CODE_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: '',
      };
    }
    case 'GET_RESET_CODE_REJECTED': {
      return {
        ...state,
        isMatch: false,
        isLoading: false,
        isErrorResetCode: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_RESET_CODE_FULFILLED': {
      return {
        ...state,
        isMatch: true,
        isLoading: false,
        isVerify: false,
        resetCodeData: action.payload.data.result,
      };
    }
    case 'VERIFY_RESET_CODE_PENDING': {
      return {
        ...state,
        isVerify: false,
        isErrorVerify: false,
      };
    }
    case 'VERIFY_RESET_CODE_REJECTED': {
      return {
        ...state,
        isVerify: false,
        isErrorVerify: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'VERIFY_RESET_CODE_FULFILLED': {
      return {
        ...state,
        isVerify: true,
        isErrorVerify: false,
        resetCodeData: action.payload.data.result,
      };
    }
    case 'LOGOUT_USER': {
      return {
        ...state,
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
        alertMsgLoginNumber: '',
        resetCodeData: {},
        isVerify: false,
        isErrorVerify: false,
        alertMsg: 'Logout Successfully',
      };
    }
    case 'CLEAR_MESSAGE_AUTH': {
      return {
        ...state,
        alertMsg: '',
        isError: false,
        isErrorNumber: false,
        isSignup: false,
        failSignup: false,
        isRegistered: false,
        isLoading: false,
        isLoadingNumber: false,
        isMatch: false,
        isErrorResetCode: false,
        resetCodeData: {},
        isErrorVerify: false,
      };
    }
    case 'CLEAR_MESSAGE_AUTH_EMAIL': {
      return {
        ...state,
        alertMsg: '',
        isError: false,
        isLoading: false,
        isLoadingNumber: false,
      };
    }
    default: {
      return state;
    }
  }
};
