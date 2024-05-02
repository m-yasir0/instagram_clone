import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ post }) => {
  return (
    <Link className='btn' to={`/posts/${post.id}/show`}>
      <div className='row row-cols-1 row-cols-md-2 g-4'>
        <div className='col w-100'>
          <div className='card'>
            {post.images && post.images[0] && (
              <img
                src={JSON.parse(post.images[0]).url}
                className='card-img-top height-200 image-cover'
                alt='post'
              />
            )}
            <div className='card-body'>
              <h5 className='card-title'>{post.title}</h5>
              <p className='card-text'>{post.content}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Posts;
