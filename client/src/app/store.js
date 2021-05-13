import { combineReducers,createStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/loading/loadingSlice';
import postReducer from '../features/post/postSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import currentPostReducer from '../features/currentPost/currentPostSlice';

// combine reducers
export default createStore(combineReducers({
  loading: loadingReducer,
  posts: postReducer,
  favorites: favoritesReducer,
  currentPost: currentPostReducer
}),
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
