import { LOAD_CATEGORIES, SAVE_CATEGORIES } from 'src/actions/category';

export const initialState = {
  categories: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
      };
    case SAVE_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };
    
    default:
      return state;
  }
};

export default reducer;
