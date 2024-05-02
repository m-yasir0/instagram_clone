import { setErrorAction } from '../reduxState/actions/errorActions';
import { setMessageAction } from '../reduxState/actions/messageAction';

export const messageTimeOut = (dispatch) => {
  setTimeout(() => {
    dispatch(setMessageAction(''));
  }, 5000);
};

export const errorTimeOut = (dispatch) => {
  setTimeout(() => {
    dispatch(setErrorAction(''));
  }, 5000);
};
