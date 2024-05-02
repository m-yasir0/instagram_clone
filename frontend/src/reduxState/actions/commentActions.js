import { COMMENT_URL, POST_URL } from '../../appConstants';
import {
  DELETE_COMMENT,
  POST_COMMENT,
  SET_COMMENTS,
  UPDATE_COMMENTS,
} from '../types';
import { fetchData } from '../../helpers/fetchHelper';

const setComment = (comment, action) => ({
  type: action,
  payload: comment,
});

export const postCommentAction = (post, body) => {
  return async function(dispatch) {
    let data = {
      body,
    };

    let res = await fetchData(
      `${COMMENT_URL}/${post}/create`,
      'post',
      dispatch,
      'Comment Posted',
      data
    );
    res && dispatch(setComment(res.data.comment, POST_COMMENT));
  };
};

export const deleteCommentAction = (id) => {
  return async function(dispatch) {
    let res = await fetchData(
      `${COMMENT_URL}/${id}/delete`,
      'delete',
      dispatch
    );
    res && dispatch(setComment(id, DELETE_COMMENT));
  };
};

export const getCommentsAction = (id) => {
  return async function(dispatch) {
    let res = await fetchData(`${POST_URL}/${id}/comments`, 'get', dispatch);
    res && dispatch(setComment(res.data.comments, SET_COMMENTS));
  };
};

export const updateCommentsAction = (id, body) => {
  return async function(dispatch) {
    let res = await fetchData(
      `${COMMENT_URL}/${id}/update`,
      'put',
      dispatch,
      null,
      {
        body,
      }
    );
    console.log(res);
    res &&
      dispatch(
        setComment(
          {
            body,
            id,
          },
          UPDATE_COMMENTS
        )
      );
  };
};
