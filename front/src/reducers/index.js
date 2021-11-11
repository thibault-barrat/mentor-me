import { combineReducers } from 'redux';

import userReducer from './user';
import categoryReducer from './category';
import serviceReducer from './service';
import adminReducer from './admin';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  services: serviceReducer,
  admin: adminReducer,
});

export default rootReducer;
