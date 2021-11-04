import {
  FETCH_SERVICES, ADD_SERVICES, CHANGE_SERVICE_FIELD, CHANGE_LOCATION,
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
  },
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
    default:
      return state;
  }
};

export default reducer;
