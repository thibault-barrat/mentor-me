import {
  CHANGE_LOGIN_FIELD,
  SAVE_USER,
  CHANGE_REGISTER_FIELD,
  SUBMIT_NEW_USER_SUCCESS,
  SUBMIT_NEW_USER,
  CREATE_MAIL_ERROR,
  CREATE_PASSWORD_ERROR,
  SAVE_USER_DETAILS,
} from '../actions/user';

export const initialState = {
  logged: false,
  role: '',
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
    loading: false,
  },
  errors: {
    mail: false,
    password: false,
  },
  details: {
    email: '',
    firstname: '',
    lastname: '',
    bio: '',
    phone: '',
    fix: '',
    avatar: '',
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_LOGIN_FIELD: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        errors: {
          ...state.errors,
        },
        [action.name]: action.value,
      };
    }
    case SAVE_USER: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        errors: {
          ...state.errors,
          mail: false,
          password: false,
        },
        logged: action.connected,
        role: action.role,
        id: action.id,
      };
    }
    case CREATE_MAIL_ERROR: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        errors: {
          ...state.errors,
          mail: true,
          password: false,
        },
      };
    }
    case CREATE_PASSWORD_ERROR: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        errors: {
          ...state.errors,
          mail: false,
          password: true,
        },
      };
    }
    case CHANGE_REGISTER_FIELD: {
      return {
        ...state,
        register: {
          ...state.register,
          [action.name]: action.value,
        },
        errors: {
          ...state.errors,
        },
      };
    }
    case SUBMIT_NEW_USER: {
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
        },
        errors: {
          ...state.errors,
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
          loading: false,
        },
        errors: {
          ...state.errors,
        },
      };
    }
    case SAVE_USER_DETAILS: {
      return {
        ...state,
        details: {
          ...state.details,
          email: action.email,
          firstname: action.firstname,
          lastname: action.lastname,
          bio: action.bio,
          phone: action.phone,
          fix: action.fix,
          avatar: action.avatar,
        },
        register: {
          ...state.register,
        },
        errors: {
          ...state.errors,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
