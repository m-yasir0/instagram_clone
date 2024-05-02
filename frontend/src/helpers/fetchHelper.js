import axios from '../config/axios';
import { errorTimeOut, messageTimeOut } from '../handlers/timeOutHandlers';
import { setErrorAction } from '../reduxState/actions/errorActions';
import { setMessageAction } from '../reduxState/actions/messageAction';
import i18n from '../i18n';

let { t } = i18n;
export const fetchData = async (
  url,
  type,
  dispatch,
  message = null,
  data = null,
  config = null
) => {
  try {
    let res = await axios[type](url, data, config);
    message = t(message ? message : res.data.message ? res.data.message : '');
    if (type !== 'get') {
      dispatch(setMessageAction(message));
      messageTimeOut(dispatch);
    }
    return res;
  } catch (e) {
    if (e.response.status === 404) {
      window.location.replace('/404');
    } else {
      let error = t(
        Array.isArray(e.respose || {}.data || {}.messages)
          ? e.respose || {}.data || {}.messages[0]
          : e.respose || {}.data || {}.messages
          ? e.respose || {}.data || {}.messages
          : 'server_error'
      );

      dispatch(setErrorAction(error));
      errorTimeOut(dispatch);
    }
  }
};
