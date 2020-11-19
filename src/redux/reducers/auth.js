/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const initialState = {
  isLogin: false,
  isSignup: false,
  failSignup: false,
  isError: false,
  token: '',
  alertMsg: '',
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
        token: action.payload.data.message,
        isLoading: false,
        isLogin: true,
        alertMsg: 'Successfully login',
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
      // console.log(action.payload.data.message);
        // localStorage.setItem('token', action.payload.data.message);
      return {
        ...state,
        isLoading: false,
        isSignup: true,
        failSignup: false,
        alertMsg: 'Signup Successfully',
      };
    }
    case 'persist/REHYDRATED': {
      return {
        ...state,
        token: action.payload,
        isLogin: true,
      };
    }
    case 'LOGOUT_USER': {
      //   localStorage.removeItem('token');
      return {
        isLogin: false,
        token: '',
        isError: false,
        alertMsg: 'Logout Successfully',
      };
    }
    case 'CLEAR_MESSAGE_AUTH': {
      return {
        ...state,
        alertMsg: '',
        isError: false,
        isSignup: false,
        isLogin: false,
        failSignup: false,
      };
    }
    default: {
      return state;
    }
  }
};
