import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postCommentAction } from '../../reduxState/actions/commentActions';

function Form() {
  let dispatcher = useDispatch();
  let { id } = useParams();
  let [input, setInput] = useState({
    body: '',
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatcher(postCommentAction(id, input.body));

    setInput({
      body: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='card-footer py-3 border-0'>
        <div className='d-flex flex-start w-100'>
          <div className='form-outline w-100'>
            <label className='form-label'>Message</label>
            <textarea
              name='body'
              onChange={handleChange}
              value={input.body}
              cols='30'
              rows='4'
              className='form-control'
              maxLength={200}
              required
            ></textarea>
          </div>
        </div>
        <div className='float-end mt-2 pt-1'>
          <input
            type='submit'
            value='Post Comment'
            className='btn btn-primary btn-sm'
          />
        </div>
      </div>
    </form>
  );
}

export default Form;
