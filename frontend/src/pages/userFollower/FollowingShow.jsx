import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { currentUser } from '../../helpers/getCurrentUser';
import {
  acceptFollowingAction,
  deleteFollowingAction,
} from '../../reduxState/actions/userActions';

const FollowingShow = ({ follow, type }) => {
  let dispatcher = useDispatch();

  let handleDelete = (id, type) => {
    dispatcher(deleteFollowingAction(id, type));
  };

  let handleAcceptance = (id) => {
    dispatcher(acceptFollowingAction(id));
  };

  let user = currentUser();
  return (
    <li className='list-group-item'>
      <div className='media'>
        <div className='media-left'>
          {type === 'follower'
            ? follow.follower &&
              follow.follower.profile_picture && (
                <Link to={`/`} className='avatar avatar-online'>
                  <img
                    src={JSON.parse(follow.follower.profile_picture).url}
                    className='avatar-50 object-cover rounded-circle'
                    alt='profile'
                  />
                </Link>
              )
            : follow.user &&
              follow.user.profile_picture && (
                <Link to={`/`} className='avatar avatar-online'>
                  <img
                    src={JSON.parse(follow.user.profile_picture).url}
                    className='avatar-50 object-cover rounded-circle'
                    alt='profile'
                  />
                </Link>
              )}
        </div>
        <small>
          {type === 'follower'
            ? follow.follower
              ? follow.follower.email
              : ''
            : follow.user
            ? follow.user.email
            : ''}
        </small>
        <div className='media-body'>
          <div className='pull-right'>
            {type === 'follower' && follow.userId === user.id ? (
              <button
                className='btn btn-danger'
                onClick={() => {
                  handleDelete(follow.id, 'follower');
                }}
              >
                Remove
              </button>
            ) : type === 'following' && follow.followerId === user.id ? (
              <button
                className='btn btn-danger'
                onClick={() => {
                  handleDelete(follow.id, 'following');
                }}
              >
                Remove
              </button>
            ) : (
              ''
            )}
            {type === 'follower' &&
              follow.userId === user.id &&
              follow.status === 'requested' && (
                <button
                  className='btn btn-info waves-effect waves-light'
                  onClick={() => {
                    handleAcceptance(follow.id);
                  }}
                >
                  Accept Follow Request
                </button>
              )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default FollowingShow;
