import {
  FETCH_SERVICES, ADD_SERVICES, CHANGE_SEARCH_VALUE, SEARCH_SERVICES_SUCCESS,
} from '../actions/service';

export const initialState = {
  items: [],
  loading: true,
  searchValue: '',
  searchResult: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_SERVICES: {
      return {
        ...state,
        items: [...state.items],
        loading: true,
        searchResult: [...state.searchResult],
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
    case SEARCH_SERVICES_SUCCESS: {
      return {
        ...state,
        searchResult: action.services,
      };
    }
    default:
      return state;
  }
};

export default reducer;
