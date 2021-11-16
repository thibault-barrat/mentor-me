import { combineReducers } from 'redux';

import userReducer from './user';
import categoryReducer from './category';
import serviceReducer from './service';
import adminReducer from './admin';
import messagesReducer from './messages';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  services: serviceReducer,
  admin: adminReducer,
  messages: messagesReducer,
});

export default rootReducer;
