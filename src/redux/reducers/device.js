const initialState = {
  isLoadingRegister: false,
  isErrorRegister: false,
  isRegister: false,
  deviceToken: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_DEVICES_PENDING': {
      return {
        ...state,
        isLoading: true,
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
        deviceToken: action.payload,
      };
    }
  }
};
