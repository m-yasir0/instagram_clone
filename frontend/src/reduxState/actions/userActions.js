import {
  ACCEPT_FOLLOWINGS,
  REMOVE_FOLLOWINGS,
  SET_USER,
  UPDATE_FOLLOWED,
  UPDATE_FOLLOWINGS,
} from '../types';
import { FOLLOWING_URL, USER_URL } from '../../appConstants';
import { fetchData } from '../../helpers/fetchHelper';

const setUser = (data, action) => ({
  type: action,
  payload: data,
});

export const loadUserAction = (id) => {
  return async (dispatch) => {
    let res = await fetchData(`${USER_URL}/${id}/show`, 'get', dispatch);
    res && dispatch(setUser(res.data, SET_USER));
  };
};

export const updateUserAction = (data) => {
  return async (dispatch) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    let res = await fetchData(
      `${USER_URL}/update`,
      'put',
      dispatch,
      'user_updated',
      data,
      config
    );
    if (res) {
      let user = JSON.parse(localStorage.getItem('user'));
      user.decoded = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        window.location.href = `/user/${res.data.id}/profile`;
      }, 3000);
    }
  };
};

export const sendRequestAction = (id) => {
  return async (dispatch) => {
    let res = await fetchData(
      `${FOLLOWING_URL}/${id}/create`,
      'post',
      dispatch,
      'request_sent'
    );
    res && dispatch(setUser(res.data, UPDATE_FOLLOWED));
  };
};

export const setFollowingAction = (id) => {
  return async (dispatch) => {
    let res = await fetchData(`${FOLLOWING_URL}/${id}/index`, 'get', dispatch);
    res && dispatch(setUser(res.data.followings, UPDATE_FOLLOWINGS));
  };
};

export const deleteFollowingAction = (id, type) => {
  return async (dispatch) => {
    let res = await fetchData(
      `${FOLLOWING_URL}/${id}/delete`,
      'delete',
      dispatch,
      type + ' removed successfully'
    );
    res &&
      dispatch(
        setUser({ followings: res.data.followings, type }, REMOVE_FOLLOWINGS)
      );
  };
};

export const acceptFollowingAction = (id) => {
  return async (dispatch) => {
    let res = await fetchData(
      `${FOLLOWING_URL}/${id}/update`,
      'put',
      dispatch,
      'request_accepted'
    );
    res && dispatch(setUser(res.data.followings, ACCEPT_FOLLOWINGS));
  };
};
