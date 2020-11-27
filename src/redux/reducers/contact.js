const initialState = {
  publicContact: {},
  listContactFriend: {},
  detailContactFriend: {},
  isLoading: false,
  isError: false,
  isAdded: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_FRIEND_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_LIST_FRIEND_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'GET_LIST_FRIEND_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        alertMsg: action.payload.data.message,
        listContact: action.payload.data,
      };
    }
    case 'GET_LIST_PUBLIC_CONTACT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_LIST_PUBLIC_CONTACT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'GET_LIST_PUBLIC_CONTACT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: action.payload.data.message,
        publicContact: action.payload.data.results,
        isError: false,
      };
    }
    case 'POST_ADD_CONTACT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'POST_ADD_CONTACT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isAdded: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'POST_ADD_CONTACT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isAdded: true,
        isError: false,
        alertMsg: action.payload.response.message,
      };
    }
    case 'GET_DETAIL_FRIEND_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DETAIL_FRIEND_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.error,
      };
    }
    case 'GET_DETAIL_FRIEND_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        alertMsg: action.payload.data.message,
        publicContact: action.payload.data,
        isError: false,
      };
    }
    case 'CLEAR_MESSAGE_CONTACT': {
      return {
        ...state,
        publicContact: {},
        listContactFriend: {},
        detailContactFriend: {},
        isLoading: false,
        isError: false,
        isAdded: false,
        alertMsg: '',
      };
    }
    // case 'persist/PURGE': {
    //   return {
    //     ...state,
    //     publicContact: {},
    //     listContactFriend: {},
    //     detailContactFriend: {},
    //     isLoading: false,
    //     isError: false,
    //     isAdded: false,
    //     alertMsg: '',
    //   };
    // }
    default: {
      return state;
    }
  }
};
