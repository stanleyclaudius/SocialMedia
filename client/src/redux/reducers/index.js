import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';
import homePost from './postReducer';
import suggestion from './suggestionReducer';
import discover from './discoverReducer';
import postDetail from './postDetailReducer';
import socket from './socketReducer';
import notification from './notificationReducer';
import message from './messageReducer';
import status from './statusReducer';
import call from './callReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  homePost,
  suggestion,
  discover,
  postDetail,
  socket,
  notification,
  message,
  status,
  call
});