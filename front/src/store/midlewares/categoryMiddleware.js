import axios from 'axios';
import { addCategories, FETCH_CATEGORIES } from '../../actions/category';

const categoryMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_CATEGORIES: {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('http://localhost:3000/categories');
          store.dispatch(addCategories(response.data));
        }
        catch (error) {
          console.log(error);
        }
      };

      fetchCategories();
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default categoryMiddleware;
