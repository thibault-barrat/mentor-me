import { createStore, applyMiddleware, compose } from 'redux';
import reducer from 'src/reducers';
import userMiddleware from './midlewares/userMiddleware';
import categoriesMiddleware from './midlewares/categoriesMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    userMiddleware,
    categoriesMiddleware,
  ),
);

const store = createStore(reducer, enhancers);

export default store;
