import { currentUser } from '../../helpers/getCurrentUser';
import {
  DELETE_COMMENT,
  POST_COMMENT,
  SET_COMMENTS,
  UPDATE_COMMENTS,
} from '../types';

const initialState = {
  comments: [],
};

const commentReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload.Comments,
      };

    case POST_COMMENT:
      action.payload['user'] = currentUser();
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((val) => {
          return val.id !== action.payload;
        }),
      };

    case UPDATE_COMMENTS:
      let i = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.comments[i].body = action.payload.body;
      return {
        ...state,
        comments: [...state.comments],
      };
    default:
      return state;
  }
};

export default commentReducers;
