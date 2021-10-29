import {
  CHANGE_LOGIN_FIELD, SAVE_USER, CHANGE_REGISTER_FIELD, SUBMIT_NEW_USER_SUCCESS,
} from '../actions/user';

export const initialState = {
  logged: false,
  isAdmin: false,
  email: '',
  password: '',
  token: null,
  id: null,
  register: {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    redirect: false,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_LOGIN_FIELD: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case SAVE_USER: {
      return {
        ...state,
        logged: action.logged,
        id: action.id,
        token: action.token,
      };
    }
    case CHANGE_REGISTER_FIELD: {
      return {
        ...state,
        register: {
          ...state.register,
          [action.name]: action.value,
        },
      };
    }
    case SUBMIT_NEW_USER_SUCCESS: {
      return {
        ...state,
        register: {
          ...state.register,
          email: '',
          password: '',
          firstname: '',
          lastname: '',
          redirect: true,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
