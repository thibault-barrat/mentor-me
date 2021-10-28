import { createStore, applyMiddleware, compose } from 'redux';
import reducer from 'src/reducers';
import userMiddleware from './midlewares/userMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    userMiddleware,
  ),
);

const store = createStore(reducer, enhancers);

export default store;
