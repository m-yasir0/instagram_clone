import {
  ACCEPT_FOLLOWINGS,
  REMOVE_FOLLOWINGS,
  SET_USER,
  UPDATE_FOLLOWED,
  UPDATE_FOLLOWINGS,
} from '../types';

const initialState = {
  user: {},
  following: [],
  followers: [],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    case UPDATE_FOLLOWED:
      let user = state.user;
      user.isFollowed = true;
      user.requestSent = false;
      return {
        ...state,
        user: user,
      };

    case UPDATE_FOLLOWINGS:
      return {
        ...state,
        followers: action.payload.followers,
        following: action.payload.following,
      };

    case REMOVE_FOLLOWINGS:
      if (action.payload.type === 'follower') {
        let followers = state.followers.filter((val) => {
          return val.id !== action.payload.followings.id;
        });

        return {
          ...state,
          followers,
        };
      } else {
        let following = state.following.filter((val) => {
          return val.id !== action.payload.followings.id;
        });

        return {
          ...state,
          following,
        };
      }

    case ACCEPT_FOLLOWINGS:
      let followers = state.followers;
      let i = findFollowing(action.payload.id, followers);
      console.log(i);
      followers[i]['status'] = 'approved';
      return {
        ...state,
        followers,
      };
    default:
      return state;
  }
};

const findFollowing = (id, data) => {
  return data.findIndex((val) => {
    return val.id === id;
  });
};
export default userReducers;
