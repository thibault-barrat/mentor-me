export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const addCategories = (categories) => ({
  type: ADD_CATEGORIES,
  categories,
});
