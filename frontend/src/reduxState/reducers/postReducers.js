import { ADD_POSTS, LIKE_POST, SET_POST, UNLIKE_POST } from '../types';

const initialState = {
  posts: [],
  post: {},
  user: {},
};

const postReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case LIKE_POST:
      let i = findPostIndex(action.payload.likedPostId, state.posts);
      let post = state.posts[i];
      delete state.posts[i];

      if (i < 0) return state;
      else {
        state.posts[i] = {
          ...post,
          likedPost: post.likedPost.concat([
            {
              id: action.payload.likedById,
              User_Likes: { id: action.payload.id },
            },
          ]),
        };
        return {
          ...state,
          posts: [...state.posts],
        };
      }

    case UNLIKE_POST:
      i = findPostIndex(action.payload.likedPostId, state.posts);
      post = state.posts[i];

      if (i < 0) return state;
      else {
        state.posts[i] = {
          ...post,
          likedPost: post.likedPost.filter((val) => {
            return val.User_Likes.id !== action.payload.id;
          }),
        };
        return {
          ...state,
          posts: [...state.posts],
        };
      }

    case SET_POST:
      return {
        ...state,
        post: action.payload.post,
      };

    default:
      return state;
  }
};

const findPostIndex = (id, posts) => {
  return posts.findIndex((val) => {
    return val.id === id;
  });
};
export default postReducers;
