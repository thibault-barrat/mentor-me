import axios from 'axios';
import { LOAD_CATEGORIES, saveCategories, } from '../../actions/category';


const categoriesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOAD_CATEGORIES : 

      next(action);
      // ici on va gérer la requête API
      axios.get('http://localhost:3000/categories')
        .then((response) => {
          // ici on va pouvoir stocker les data reçues
          // => modifier le state
          // => dispatch une action
          store.dispatch(saveCategories(response.data));
        })
        .catch((error) => console.log(error));
      break;
      /* const loadCategories = async () => {
        try {
          const response = await axios.post('http://localhost:3000/categories', {
            id,
            name,
            color,
            image,
          });
          // une fois qu'on a la réponse, on peut venir stocker les infos du user
          // dans le state => modifier le state => dispatch d'action
          store.dispatch(saveUser(response.data));
        }
        catch (error) {
          console.log(error);
        }
      }; */

      //loadCategories();

      break;

      default:
        next(action);
  }
    
};

export default categoriesMiddleware;
