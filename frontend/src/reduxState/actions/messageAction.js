import { SET_MESSAGE } from '../types';

const setMessage = (msg) => ({
  type: SET_MESSAGE,
  payload: msg,
});

export const setMessageAction = (msg) => {
  return function(dispatch) {
    dispatch(setMessage(msg));
  };
};
