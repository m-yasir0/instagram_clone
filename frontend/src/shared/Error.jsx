import React, { memo } from 'react';

const ErrorComp = (props) => {
  let error = props.error;
  return (
    <>
      {error !== '' && (
        <div className='container-fluid index-100 position-fixed right-0 left-0 top-20 w-100'>
          <div
            className='alert alert-danger alert-dismissible fade show position-fixed w-100 top-0'
            role='alert'
          >
            {error}
          </div>
        </div>
      )}
    </>
  );
};

export const Error = memo(ErrorComp);
