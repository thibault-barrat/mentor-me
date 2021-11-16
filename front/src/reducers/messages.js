import { CHANGE_FIELD, SUBMIT_FORM_SUCCESS, SUBMIT_FORM } from 'src/actions/messages';

export const initialState = {
  lastname: '',
  firstname: '',
  email: '',
  message: '',
  notifMessage: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_FIELD: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case SUBMIT_FORM: {
      return {
        ...state,
        notifMessage: false,
      };
    }
    case SUBMIT_FORM_SUCCESS: {
      return {
        ...state,
        lastname: '',
        firstname: '',
        email: '',
        message: '',
        notifMessage: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
