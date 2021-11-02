export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';


export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
});

export const saveCategories = (categories) => ({
  type: SAVE_CATEGORIES,
  categories,
});
