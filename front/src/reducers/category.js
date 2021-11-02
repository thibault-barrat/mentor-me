import { ADD_CATEGORIES, FETCH_CATEGORIES } from '../actions/category';

export const initialState = {
  items: [],
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CATEGORIES: {
      return {
        ...state,
        items: [...state.items],
        loading: true,
      };
    }
    case ADD_CATEGORIES: {
      return {
        ...state,
        items: action.categories,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
