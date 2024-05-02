import { SET_ERROR } from '../types';

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setErrorAction = (error) => {
  return function(dispatch) {
    dispatch(setError(error));
  };
};
