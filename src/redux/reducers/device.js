const initialState = {
  isLoadingRegister: false,
  isErrorRegister: false,
  isRegister: false,
  deviceToken: '',
  isLoadingDelete: false,
  isErrorDelete: false,
  isDeleted: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_DEVICES_PENDING': {
      return {
        ...state,
        isLoadingRegister: true,
        isErrorRegister: false,
        isRegister: false,
      };
    }
    case 'REGISTER_DEVICES_REJECTED': {
      return {
        ...state,
        isLoadingRegister: false,
        isErrorRegister: true,
        isRegister: false,
      };
    }
    case 'REGISTER_DEVICES_FULFILLED': {
      return {
        ...state,
        isLoadingRegister: false,
        isErrorRegister: false,
        isRegister: true,
        // deviceToken: action.data,
      };
    }
    case 'REMOVE_DEVICE_TOKEN_PENDING': {
      return {
        ...state,
        isLoadingDelete: true,
        isErrorDelete: false,
        isDeleted: false,
      };
    }
    case 'REMOVE_DEVICE_TOKEN_REJECTED': {
      return {
        ...state,
        isLoadingDelete: false,
        isErrorDelete: true,
        isDeleted: false,
      };
    }
    case 'REMOVE_DEVICE_TOKEN_FULFILLED': {
      return {
        ...state,
        isLoadingDelete: false,
        isErrorDelete: false,
        isDeleted: true,
        // deviceToken: action.data,
      };
    }
    case 'SET_DEVICE_TOKEN': {
      return {
        ...state,
        deviceToken: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
