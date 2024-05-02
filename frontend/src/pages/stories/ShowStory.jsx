import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { currentUser } from '../../helpers/getCurrentUser';
import {
  deleteStoryAction,
  loadStoryAction,
} from '../../reduxState/actions/storyActions';

const ShowStory = () => {
  let { id } = useParams();
  let dispatcher = useDispatch();
  let { story } = useSelector((state) => state.stories);

  useEffect(() => {
    if (story.id !== id) {
      dispatcher(loadStoryAction(id));
    }
  }, []);

  let handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the story'))
      dispatcher(deleteStoryAction(id));
  };

  return (
    <>
      <div className='container'>
        <div className='card mb-3'>
          {story.image && (
            <img
              src={JSON.parse(story.image).url}
              alt='Story'
              className='card-img-top'
            />
          )}
          <div className='card-body'>
            <p className='card-text'>{story.content}</p>
            <p className='card-text'>
              <small className='text-muted'>{story.createdAt}</small>
            </p>
          </div>
        </div>
        {currentUser().id === story.userId && (
          <div className='d-grid gap-2'>
            <Link to={`/stories/${story.id}/edit`} className='btn btn-primary'>
              Edit
            </Link>
            <button
              className='btn btn-danger'
              onClick={() => handleDelete(story.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowStory;
