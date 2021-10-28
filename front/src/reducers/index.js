import { combineReducers } from 'redux';

import userReducer from './user';
import categoryReducer from './category';
import serviceReducer from './service';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  services: serviceReducer,
});

export default rootReducer;
