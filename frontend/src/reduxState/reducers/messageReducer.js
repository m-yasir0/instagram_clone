import { SET_MESSAGE } from '../types';

const initialState = {
  message: '',
};

const messageReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducers;
