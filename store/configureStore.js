import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import profile from '../reducers/profile';
let persistedState= {}
if (typeof window !== 'undefined') {
  persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}
}
const rootReducer = combineReducers({
  user: profile
});

const configureStore = () => {
  return createStore(
    rootReducer,
    persistedState,
    compose(applyMiddleware(thunk))
  );
};

export default configureStore;