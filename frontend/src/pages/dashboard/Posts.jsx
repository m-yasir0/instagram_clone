import React, { useState } from 'react';
import './posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deletePostAction,
  likePostAction,
} from '../../reduxState/actions/postActions';
import moment from 'moment';
import { currentUser } from '../../helpers/getCurrentUser';

const Posts = (props) => {
  const dispatcher = useDispatch();
  const post = props.post;

  let handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the post'))
      dispatcher(deletePostAction(id));
  };

  const handleLike = (id) => {
    dispatcher(likePostAction(id));
  };

  let [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => {
    if (menuVisible) setMenuVisible(false);
    else setMenuVisible(true);
  };
  return (
    <div className='card mt-1'>
      <div className='d-flex justify-content-between p-2 px-3'>
        <div className='d-flex flex-row align-items-center'>
          {post.user.profile_picture && (
            <img
              alt='profile'
              src={JSON.parse(post.user.profile_picture).url}
              className='rounded-circle object-cover'
              width='50px'
              height='50px'
            />
          )}
          <div className='d-flex flex-column ml-2'>
            <span className='font-weight-bold ms-2'>
              <a href='/'>{post.user.email}</a>
            </span>
          </div>
        </div>
        <div className='d-flex flex-row mt-1 ellipsis mr-3'>
          {' '}
          <small className='m-3'>{moment(post.createdAt).fromNow()}</small>
          <i
            onClick={() => openMenu()}
            class='fa fa-ellipsis-h dropdown-toggle'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          ></i>
        </div>
        <div class={menuVisible ? 'dropdown-menu show' : 'dropdown-menu'}>
          {currentUser().id === post.userId && (
            <Link to={`/posts/${post.id}/edit`} className='dropdown-item'>
              Edit
            </Link>
          )}
          {currentUser().id === post.userId && (
            <button
              className='dropdown-item'
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          )}
          <div class='dropdown-divider'></div>
          <Link to={`/posts/${post.id}/show`} className='dropdown-item'>
            View
          </Link>
        </div>
      </div>

      <Link to={`/posts/${post.id}/show`}>
        {post.images && post.images[0] && (
          <img
            alt='post-img'
            src={JSON.parse(post.images[0]).url}
            className='img-fluid object-cover w-100'
          />
        )}
      </Link>

      <a href='/' className='w-100'></a>
      <div className='p-2'>
        <p className='text-justify'>{post.content}</p>
        <hr />
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex flex-row icons d-flex align-items-center'>
            {liked(post.likedPost) ? (
              <FontAwesomeIcon
                icon={faHeart}
                className='like-post liked'
                onClick={() => {
                  handleLike(post.id);
                }}
                style={{ fontSize: '25px' }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                className='like-post'
                onClick={() => {
                  handleLike(post.id);
                }}
                style={{ fontSize: '25px' }}
              />
            )}
            {/* <% else %> */}
            {/* <i className='fa fa-heart like-post' value=<%= like_post_path post %>></i> */}
            {/* <% end %> */}
            <small className='ms-1'>
              {' '}
              Likes <span className='likesCount'>{post.likedPost.length}</span>
            </small>
            <Link to={`posts/${post.id}/comments`}>
              <FontAwesomeIcon
                icon={faComment}
                style={{ fontSize: '25px' }}
                className='ms-2'
              />
            </Link>
          </div>
          <div className='d-flex flex-row muted-color'>
            <span>{post.Comments.length} comments</span>
          </div>
        </div>
        <hr />
        <div className='comments'>
          <div className='d-flex flex-row align-items-center status'>
            {post.Comments.length > 1 && (
              <small>
                <Link to={`posts/${post.id}/comments`}>Show all Comments</Link>
              </small>
            )}
          </div>
          {post.Comments.length > 0 && (
            <div className='d-flex flex-row mb-2'>
              {post.Comments[0].user.profile_picture && (
                <img
                  alt='profile'
                  src={JSON.parse(post.Comments[0].user.profile_picture).url}
                  className='rounded-circle object-cover'
                  width='40px'
                  height='40px'
                />
              )}
              <div className='d-flex flex-column ml-2'>
                <span className='name ms-2'>{post.Comments[0].user.email}</span>
                <small className='comment-text ms-2'>
                  {post.Comments[0].body}
                  ----{' '}
                  <small>{moment(post.Comments[0].createdAt).fromNow()}</small>
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const liked = (likes) => {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user).decoded;
    let like = likes.find((val) => {
      return val['id'] === user.id;
    });
    if (like) return true;
    else return false;
  } else return false;
};
export default Posts;
