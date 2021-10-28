import { CHANGE_LOGIN_FIELD, SAVE_USER } from '../actions/user';

export const initialState = {
  logged: false,
  isAdmin: false,
  email: '',
  password: '',
  token: null,
  firstname: '',
  lastname: '',
  id: null,
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
    default:
      return state;
  }
};

export default reducer;
