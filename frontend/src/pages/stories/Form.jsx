import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  createStoryAction,
  loadStoryAction,
  updateStoryAction,
} from '../../reduxState/actions/storyActions';

const Form = ({ action }) => {
  let dispatcher = useDispatch();
  let [inputs, setInputs] = useState({});
  let [file, setFile] = useState({});
  let { story } = useSelector((state) => state.stories);

  let { id } = useParams();
  useEffect(() => {
    if (!inputs.content) {
      if (story.id !== id && action === 'edit') {
        dispatcher(loadStoryAction(id));
      }
      if (action === 'edit') {
        setInputs({
          content: story.content,
        });
      }
    }
  }, [story]);

  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function handleFileInput(e) {
    const { name } = e.target;
    setInputs({
      ...inputs,
      [name]: e.target.files[0],
    });

    setFile({
      file: e.target.files[0],
      value: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let form = new FormData();

    Object.keys(inputs).forEach((element) => {
      form.append(element, inputs[element]);
    });

    if (action === 'new') dispatcher(createStoryAction(form));
    else dispatcher(updateStoryAction(form, id));
  }
  return (
    <>
      <h2 className='text-center'>
        {action === 'edit' ? 'Update Story' : 'Create New Story'}
      </h2>
      <form className='container' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='content' className='form-label'>
            Content
          </label>
          <textarea
            name='content'
            id='content'
            cols='30'
            className='form-control'
            value={inputs.content}
            rows='10'
            maxLength={200}
            onChange={handleInputs}
          ></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='image' className='form-label'>
            Images
          </label>
          <input
            type='file'
            name='image'
            multiple={false}
            id='image'
            accept='image/*'
            value={file.value}
            onChange={handleFileInput}
          />
        </div>
        <input
          type='submit'
          value={action === 'edit' ? 'Update Story' : 'Create Story'}
          className='btn btn-success mt-5'
        />
      </form>
    </>
  );
};

export default Form;
