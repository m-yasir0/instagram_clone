import { combineReducers } from 'redux';
import commentReducers from './reducers/commentReducers';
import errorReducers from './reducers/errorReducer';
import messageReducers from './reducers/messageReducer';
import postReducers from './reducers/postReducers';
import storyReducers from './reducers/storyReducers';
import userReducers from './reducers/userReducers';

const rootReducer = combineReducers({
  posts: postReducers,
  error: errorReducers,
  message: messageReducers,
  comments: commentReducers,
  stories: storyReducers,
  users: userReducers,
});

export default rootReducer;
