import { ADD_STORIES, SET_STORY } from '../types';
import { STORY_URL } from '../../appConstants';
import { fetchData } from '../../helpers/fetchHelper';

const setStory = (data, action) => ({
  type: action,
  payload: data,
});

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

export const loadStoriesAction = () => {
  return async function(dispatch) {
    let res = await fetchData(`${STORY_URL}`, 'get', dispatch);
    res && dispatch(setStory(res.data.stories, ADD_STORIES));
  };
};

export const loadStoryAction = (id, setInputs = null) => {
  return async (dispatch) => {
    let res = await fetchData(`${STORY_URL}/${id}/show`, 'get', dispatch);
    res && dispatch(setStory(res.data, SET_STORY));
    if (setInputs) {
      setInputs({
        content: res.data.content,
      });
    }
  };
};

export const deleteStoryAction = (id) => {
  return async (dispatch) => {
    let res = await fetchData(
      `${STORY_URL}/${id}/delete`,
      'delete',
      dispatch,
      'story_deleted'
    );
    res &&
      setTimeout(() => {
        window.location.href = '/stories';
      }, 3000);
  };
};

export const createStoryAction = (data) => {
  return async (dispatch) => {
    let res = await fetchData(
      `${STORY_URL}/create`,
      'post',
      dispatch,
      'story_created',
      data,
      config
    );
    res &&
      dispatch(setStory(res.data.story, SET_STORY)) &&
      setTimeout(() => {
        window.location.href = `/stories/${res.data.story.id}/show`;
      }, 3000);
  };
};

export const updateStoryAction = (data, id) => {
  return async (dispatch) => {
    let res = await fetchData(
      `${STORY_URL}/${id}/update`,
      'put',
      dispatch,
      'story_updated',
      data,
      config
    );
    res &&
      dispatch(setStory(res.data.story, SET_STORY)) &&
      setTimeout(() => {
        window.location.href = `/stories/${res.data.story.id}/show`;
      }, 3000);
  };
};
