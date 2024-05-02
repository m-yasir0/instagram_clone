import React, { memo } from 'react';

const MessageComp = (props) => {
  return (
    <>
      {props.msg !== '' && (
        <div className='container-fluid index-100 position-fixed right-0 left-0 top-20 w-100'>
          <div
            className='alert alert-warning alert-dismissible fade show'
            role='alert'
          >
            {props.msg}
          </div>
        </div>
      )}
    </>
  );
};

export const Message = memo(MessageComp);
