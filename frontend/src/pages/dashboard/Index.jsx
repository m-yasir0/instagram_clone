import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostsAction } from '../../reduxState/actions/postActions';

import Posts from './Posts';
function Index() {
  let { posts } = useSelector((state) => state.posts);
  let dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(loadPostsAction());
  }, []);

  return (
    <div className='container'>
      {posts.length <= 0 ? (
        <div className='row'>
          <div className='text-center'>No Posts to show</div>
        </div>
      ) : (
        <div className='row d-flex align-items-center justify-content-center'>
          <div className='col-md-6'>
            {posts.map((post) => (
              <Posts post={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
