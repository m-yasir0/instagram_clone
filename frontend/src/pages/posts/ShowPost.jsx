import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  deletePostAction,
  loadPostAction,
} from '../../reduxState/actions/postActions';
import Images from './Images';
import { currentUser } from '../../helpers/getCurrentUser';

const ShowPost = () => {
  let { id } = useParams();
  let dispatcher = useDispatch();
  let { post } = useSelector((state) => state.posts);

  let handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the post'))
      dispatcher(deletePostAction(id));
  };

  useEffect(() => {
    dispatcher(loadPostAction(id));
  }, []);

  return (
    <>
      <div className='container'>
        <div className='text-center'>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
        <div className='row'>
          {post.images &&
            post.images.map((val) => {
              return <Images url={JSON.parse(val).url} />;
            })}
        </div>

        <div className='d-grid gap-2 mt-0'>
          <Link
            to={`/posts/${id}/comments`}
            className='btn btn-warning btn-block'
          >
            Comments
          </Link>
        </div>

        {currentUser().id === post.userId && (
          <div className='d-grid gap-2'>
            <button
              className='btn btn-danger mt-3'
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
            <Link to={`/posts/${id}/edit`} className='btn btn-primary mt-3'>
              Edit Post
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowPost;
