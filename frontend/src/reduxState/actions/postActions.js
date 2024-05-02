import { ADD_POSTS, LIKE_POST, SET_POST, UNLIKE_POST } from '../types';
import { POST_URL } from '../../appConstants';
import { fetchData } from '../../helpers/fetchHelper';

const setPosts = (data, action) => ({
  type: action,
  payload: data,
});

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

export const loadPostsAction = () => {
  return async function(dispatch) {
    let res = await fetchData(`${POST_URL}`, 'get', dispatch);
    res && dispatch(setPosts(res.data.posts, ADD_POSTS));
  };
};

export const likePostAction = (id) => {
  return async (dispatch) => {
    let res = await fetchData(`${POST_URL}/${id}/like`, 'post', dispatch);
    if (res && res.data.like.like) {
      dispatch(setPosts(res.data.like.liked, LIKE_POST));
    } else if (res) {
      dispatch(setPosts(res.data.like.liked, UNLIKE_POST));
    }
  };
};

export const loadPostAction = (id) => {
  return async (dispatch) => {
    let res = await fetchData(`${POST_URL}/${id}/show`, 'get', dispatch);
    res && dispatch(setPosts(res.data, SET_POST));
  };
};

export const deletePostAction = (id) => {
  return async (dispatch) => {
    let res = await fetchData(
      `${POST_URL}/${id}/delete`,
      'delete',
      dispatch,
      'post_deleted'
    );
    res &&
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
  };
};

export const createPostAction = (data) => {
  return async (dispatch) => {
    let res = await fetchData(
      `${POST_URL}/create`,
      'post',
      dispatch,
      'post_created',
      data,
      config
    );
    res &&
      dispatch(setPosts(res.data.post, SET_POST)) &&
      setTimeout(() => {
        window.location.href = `/posts/${res.data.post.id}/show`;
      }, 3000);
  };
};

export const updatePostAction = (data, id) => {
  return async (dispatch) => {
    let res = await fetchData(
      `${POST_URL}/${id}/update`,
      'put',
      dispatch,
      'post_updated',
      data,
      config
    );
    res &&
      dispatch(setPosts(res.data.post, SET_POST)) &&
      setTimeout(() => {
        window.location.href = `/posts/${res.data.post.id}/show`;
      }, 3000);
  };
};
