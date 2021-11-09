import {
  FETCH_SERVICES,
  ADD_SERVICES,
  CHANGE_SEARCH_VALUE,
  SEARCH_SERVICES,
  SEARCH_SERVICES_SUCCESS,
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
  searchValue: '',
  searchResult: [],
  searchLoading: false,
  searchRedirect: false,
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
        searchResult: [...state.searchResult],
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
        searchResult: [...state.searchResult],
      };
    }
    case CHANGE_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.value,
        searchResult: [...state.searchResult],
      };
    }
    case SEARCH_SERVICES: {
      return {
        ...state,
        searchLoading: true,
        searchRedirect: true,
      };
    }
    case SEARCH_SERVICES_SUCCESS: {
      return {
        ...state,
        searchResult: action.services,
        searchLoading: false,
        searchRedirect: false,
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
