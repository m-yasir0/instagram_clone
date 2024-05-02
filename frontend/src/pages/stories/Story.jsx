import React from 'react';
import { Link } from 'react-router-dom';

const Story = ({ story }) => {
  return (
    <Link to={`/stories/${story.id}/show`}>
      <div class='single-story'>
        {story.image && (
          <img
            src={JSON.parse(story.image).url}
            alt='story'
            className='single-story-bg'
          />
        )}
        <div class='story-author'>
          {story.user.profile_picture && (
            <img src={JSON.parse(story.user.profile_picture).url} alt='user' />
          )}
          <p>{story.user.email}</p>
        </div>
      </div>
    </Link>
  );
};

export default Story;
