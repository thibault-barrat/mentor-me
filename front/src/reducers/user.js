import {
  CHANGE_LOGIN_FIELD,
  SAVE_USER,
  CHANGE_REGISTER_FIELD,
  SUBMIT_NEW_USER_SUCCESS,
  SUBMIT_NEW_USER,
  CREATE_MAIL_ERROR,
  CREATE_REGISTER_MAIL_ERROR,
  CREATE_PASSWORD_ERROR,
  SAVE_USER_DETAILS,
  CHANGE_PROFILE_FIELD,
  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_IMAGE,
  DELETE_TOKEN,
  SEND_IMAGE_SUCCESS,
  DELETE_PROFILE_SUCCESS,
  SAVE_LIKED_SERVICES,
  UPDATE_USER_LOCATION,
} from '../actions/user';

export const initialState = {
  logged: false,
  role: '',
  email: '',
  password: '',
  token: null,
  id: null,
  accessToken: null,
  logout: false,
  latitude: null,
  longitude: null,
  register: {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    redirect: false,
    loading: false,
    notifRegister: false,
  },
  errors: {
    mail: false,
    password: false,
    registerMail: false,
  },
  details: {
    loading: false,
    email: '',
    firstname: '',
    lastname: '',
    bio: '',
    phone: '',
    fix: '',
    avatar: 'https://i.imgur.com/Z9fVYeP.png',
    uploadedImage: null,
    loadingAvatar: false,
    notifUpdate: false,
    notifAvatar: false,
    notifDelete: false,
  },
  likedServices: [],
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
        details: {
          ...state.details,
        },
        likedServices: [
          ...state.likedServices,
        ],
        [action.name]: action.value,
      };
    }
    case SAVE_USER: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
        },
        errors: {
          ...state.errors,
          mail: false,
          password: false,
        },
        likedServices: [
          ...state.likedServices,
        ],
        logged: true,
        id: action.id,
        role: action.role,
        accessToken: action.accessToken,
        logout: false,
      };
    }
    case CREATE_MAIL_ERROR: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
        },
        errors: {
          ...state.errors,
          mail: true,
          password: false,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case CREATE_REGISTER_MAIL_ERROR: {
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
        },
        details: {
          ...state.details,
        },
        errors: {
          ...state.errors,
          registerMail: true,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case CREATE_PASSWORD_ERROR: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
        },
        errors: {
          ...state.errors,
          mail: false,
          password: true,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case CHANGE_REGISTER_FIELD: {
      return {
        ...state,
        register: {
          ...state.register,
          [action.name]: action.value,
        },
        details: {
          ...state.details,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case SUBMIT_NEW_USER: {
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
          notifRegister: false,
        },
        errors: {
          ...state.errors,
        },
        details: {
          ...state.details,
        },
        likedServices: [
          ...state.likedServices,
        ],
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
          notifRegister: true,
        },
        errors: {
          ...state.errors,
          registerMail: false,
        },
        details: {
          ...state.details,
        },
        likedServices: [
          ...state.likedServices,
        ],
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
          uploadedImage: null,
          notifUpdate: false,
          notifAvatar: false,
          notifDelete: false,
          loadingAvatar: false,
        },
        register: {
          ...state.register,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case CHANGE_PROFILE_FIELD: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
          [action.name]: action.value,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case SAVE_PROFILE: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
          loading: true,
          notifUpdate: false,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case SAVE_PROFILE_SUCCESS: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
          loading: false,
          notifUpdate: true,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case SAVE_IMAGE: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
          uploadedImage: action.image,
          notifAvatar: false,
          loadingAvatar: true,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case SEND_IMAGE_SUCCESS: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
          notifAvatar: true,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case DELETE_TOKEN: {
      return {
        ...state,
        logged: false,
        accessToken: null,
        role: '',
        id: null,
        logout: true,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case DELETE_PROFILE_SUCCESS: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
          notifDelete: true,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    case SAVE_LIKED_SERVICES: {
      return {
        ...state,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
        },
        errors: {
          ...state.errors,
        },
        likedServices: action.services,
      };
    }
    case UPDATE_USER_LOCATION: {
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
        register: {
          ...state.register,
        },
        details: {
          ...state.details,
        },
        errors: {
          ...state.errors,
        },
        likedServices: [
          ...state.likedServices,
        ],
      };
    }
    default:
      return state;
  }
};

export default reducer;
