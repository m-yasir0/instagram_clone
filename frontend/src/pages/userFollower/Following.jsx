import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowingAction } from '../../reduxState/actions/userActions';
import { useParams } from 'react-router-dom';
import FollowingShow from './FollowingShow';

const Following = () => {
  var { following, followers } = useSelector((state) => state.users);
  let dispatcher = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatcher(setFollowingAction(id));
  }, []);

  console.log(followers);
  return (
    <div class='container'>
      <div class='row bootstrap snippets bootdey'>
        <div class='col-md-8 col-xs-12'>
          <div class='panel' id='followers'>
            <div class='panel-heading'>
              <h3 class='panel-title'>
                <i class='icon md-check' aria-hidden='true'></i> Followers
              </h3>
            </div>
            <div class='panel-body'>
              <ul class='list-group list-group-dividered list-group-full'>
                {followers && followers.length > 0 ? (
                  followers.map((elem) => {
                    return <FollowingShow type='follower' follow={elem} />;
                  })
                ) : (
                  <h5 class='text-danger'>No Followers to show</h5>
                )}
              </ul>
            </div>
          </div>
          <div class='panel mt-5' id='followings'>
            <div class='panel-heading'>
              <h3 class='panel-title'>
                <i class='icon md-check' aria-hidden='true'></i> Followings
              </h3>
            </div>
            <div class='panel-body'>
              <ul class='list-group list-group-dividered list-group-full'>
                {following && following.length > 0 ? (
                  following.map((elem) => {
                    return <FollowingShow type={'following'} follow={elem} />;
                  })
                ) : (
                  <h5 class='text-danger'>No Followings to show</h5>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Following;
