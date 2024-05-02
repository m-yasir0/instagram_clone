import { ADD_STORIES, SET_STORY } from '../types';

const initialState = {
  stories: [],
  story: {},
};

const storyReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STORIES:
      return {
        ...state,
        stories: action.payload,
      };

    case SET_STORY:
      return {
        ...state,
        story: action.payload.story,
      };

    default:
      return state;
  }
};

export default storyReducers;
