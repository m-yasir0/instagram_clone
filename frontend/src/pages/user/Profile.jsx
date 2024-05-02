import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { currentUser } from '../../helpers/getCurrentUser';
import {
  loadUserAction,
  sendRequestAction,
} from '../../reduxState/actions/userActions';
import Posts from './Posts';

const Profile = () => {
  let { user } = useSelector((state) => state.users);
  let dispatcher = useDispatch();
  let { id } = useParams();
  let userData = user.user;

  let handleRequest = () => {
    dispatcher(sendRequestAction(id));
  };

  useEffect(() => {
    dispatcher(loadUserAction(id));
  }, []);
  return (
    <section className='h-100 gradient-custom-2'>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col col-lg-9 col-xl-7'>
            <div className='card'>
              <div className='rounded-top text-white d-flex flex-row bg-dark height-200'>
                <div className='ms-4 mt-5 d-flex flex-column height-150'>
                  {userData && userData.profile_picture && (
                    <img
                      src={JSON.parse(userData.profile_picture).url}
                      alt='profile'
                      className='img-fluid img-thumbnail mt-5 mb-2 profile-picture'
                    />
                  )}

                  {userData && userData.id === currentUser().id && (
                    <Link
                      to={'/user/edit'}
                      className='btn btn-outline-dark index-1'
                    >
                      Edit
                    </Link>
                  )}

                  {user && !user.requestSent && !user.isFollowed && (
                    <button
                      className='btn btn-primary mt-5 index-1'
                      onClick={handleRequest}
                    >
                      Send Request
                    </button>
                  )}
                </div>
                <div className='ms-3' style={{ 'margin-top': '130px' }}>
                  <h5>{userData ? userData.email : ''}</h5>
                </div>
              </div>
              <div className='p-4 text-black bg-light'>
                <div className='d-flex justify-content-end text-center py-1'>
                  <div className='px-3'>
                    <Link to={'/'} className='text-decoration-none'>
                      <p className='mb-1 h5'>
                        {user && user.posts ? user.posts.length : 0}
                      </p>
                      <p className='small text-muted mb-0'>Posts</p>
                    </Link>
                  </div>
                  <div className='px-3'>
                    <Link
                      to={`/user/${id}/followings`}
                      className='text-decoration-none'
                    >
                      <p className='mb-1 h5'>
                        {user && user.followers ? user.followers : 0}
                      </p>
                      <span className='small text-muted mb-0'>Followers</span>
                    </Link>
                  </div>
                  <div className='px-3'>
                    <Link
                      to={`/user/${id}/followings`}
                      className='text-decoration-none'
                    >
                      <p className='mb-1 h5'>
                        {user && user.following ? user.following : 0}
                      </p>
                      <span className='small text-muted mb-0'>Followings</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='card-body p-4 text-black'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <p className='lead fw-normal mb-0'>Recent posts</p>
                </div>
                {userData &&
                (user.isFollowed || userData.user_type === 'public') ? (
                  user && user.posts && user.posts.length > 0 ? (
                    user.posts.map((elem) => {
                      return <Posts key={elem.id} post={elem} />;
                    })
                  ) : (
                    'No Posts to show'
                  )
                ) : (
                  <h2 className='text-center'>User is private</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
