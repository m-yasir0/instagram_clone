import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentAction } from '../../reduxState/actions/commentActions';

const Comment = (props) => {
  let dispatcher = useDispatch();
  const handleDelete = (id) => {
    dispatcher(deleteCommentAction(id));
  };
  let user = JSON.parse(localStorage.getItem('user')).decoded;
  const comment = props.comment;
  return (
    <div className='card-body'>
      <div className='d-flex flex-start align-items-center'>
        {comment.user.profile_picture && (
          <img
            src={JSON.parse(comment.user.profile_picture).url}
            alt='profile_picture'
            className='rounded-circle shadow-1-strong me-3'
            width='60px'
            height='60px'
          />
        )}

        <div>
          <h6 className='fw-bold text-primary mb-1'>{comment.user.email}</h6>
          <p className='text-muted small mb-0'>
            Shared publicly - {comment.createdAt}
          </p>
        </div>
      </div>
      <p className='mt-3 mb-4 pb-2'>{comment.body}</p>
      {comment.user.id === user.id && (
        <div className='small d-flex justify-content-start'>
          <button
            className='d-flex align-items-center me-3 btn btn-link btn-sm'
            onClick={() => {
              props.modalHandler(true, comment.body, comment.id);
            }}
          >
            Edit
          </button>
          <button
            className='d-flex align-items-center me-3 btn btn-link btn-sm'
            onClick={() => {
              handleDelete(comment.id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
