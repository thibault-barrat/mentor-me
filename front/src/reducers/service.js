import {
  FETCH_SERVICES,
  ADD_SERVICES,
  CHANGE_SERVICE_FIELD,
  CHANGE_LOCATION,
  SUBMIT_SERVICE,
  SUBMIT_SERVICE_SUCCESS,
  DELETE_SERVICE,
  DELETE_SERVICE_SUCCESS,
} from '../actions/service';

export const initialState = {
  items: [],
  loading: true,
  new: {
    category: '',
    title: '',
    duration: '',
    irl: false,
    online: false,
    description: '',
    location: {},
    loading: false,
    notifService: false,
  },
  notifDelete: false,
  loadingDelete: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_SERVICES: {
      return {
        ...state,
        items: [...state.items],
        loading: true,
        new: {
          ...state.new,
          location: {
            ...state.new.location,
          },
        },
      };
    }
    case ADD_SERVICES: {
      return {
        ...state,
        items: action.services,
        loading: false,
        new: {
          ...state.new,
          location: {
            ...state.new.location,
          },
        },
      };
    }
    case CHANGE_SERVICE_FIELD: {
      return {
        ...state,
        items: [...state.items],
        new: {
          ...state.new,
          [action.name]: action.value,
          location: {
            ...state.new.location,
          },
        },
      };
    }
    case CHANGE_LOCATION: {
      return {
        ...state,
        items: [...state.items],
        new: {
          ...state.new,
          location: action.location,
        },
      };
    }
    case SUBMIT_SERVICE: {
      return {
        ...state,
        items: [...state.items],
        new: {
          ...state.new,
          loading: true,
          notifService: false,
        },
      };
    }
    case SUBMIT_SERVICE_SUCCESS: {
      return {
        ...state,
        items: [...state.items],
        new: {
          ...state.new,
          category: '',
          title: '',
          duration: '',
          irl: false,
          online: false,
          description: '',
          location: {},
          loading: false,
          notifService: true,
        },
      };
    }
    case DELETE_SERVICE: {
      return {
        ...state,
        items: [...state.items],
        new: {
          ...state.new,
        },
        loadingDelete: true,
        notifDelete: false,
      };
    }
    case DELETE_SERVICE_SUCCESS: {
      return {
        ...state,
        items: [...state.items],
        new: {
          ...state.new,
        },
        loadingDelete: false,
        notifDelete: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
