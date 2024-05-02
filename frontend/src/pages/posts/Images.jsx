import React from 'react';

const Images = ({ url }) => {
  return (
    <div className='col-sm-6 col-md-4 mb-3'>
      <img
        src={url}
        alt='post'
        className='w-100 shadow-1-strong rounded mb-4 fluid img-thumbnail'
      />
    </div>
  );
};

export default Images;
