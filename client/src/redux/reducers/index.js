import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';
import homePost from './postReducer';
import suggestion from './suggestionReducer';
import discover from './discoverReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  homePost,
  suggestion,
  discover
});