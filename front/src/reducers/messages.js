import { CHANGE_FIELD, SUBMIT_FORM_SUCCESS } from 'src/actions/messages';

export const initialState = {
  lastname: '',
  firstname: '',
  email: '',
  message: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_FIELD: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case SUBMIT_FORM_SUCCESS: {
      return {
        ...state,
        lastname: '',
        firstname: '',
        email: '',
        message: '',
      };
    }
    default:
      return state;
  }
};

export default reducer;
