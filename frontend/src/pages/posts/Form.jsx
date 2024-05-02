import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  createPostAction,
  loadPostAction,
  updatePostAction,
} from '../../reduxState/actions/postActions';

const Form = ({ action }) => {
  let dispatcher = useDispatch();
  let [inputs, setInputs] = useState({});
  let [files, setFile] = useState({});
  let { post } = useSelector((state) => state.posts);

  let { id } = useParams();
  useEffect(() => {
    if (!inputs.title) {
      if (post.id !== id && action === 'edit') {
        dispatcher(loadPostAction(id));
      }
      if (action === 'edit') {
        setInputs({
          title: post.title,
          content: post.content,
        });
      }
    }
  }, [post]);

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
      [name]: e.target.files,
    });

    setFile({
      file: e.target.files,
      value: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let form = new FormData();

    Object.keys(inputs).forEach((element) => {
      if (element === 'images') {
        for (const key of Object.keys(inputs[element])) {
          form.append(element, inputs[element][key]);
        }
      } else {
        form.append(element, inputs[element]);
      }
    });

    if (action === 'new') dispatcher(createPostAction(form));
    else dispatcher(updatePostAction(form, id));
  }

  return (
    <>
      <h2 className='text-center'>
        {action === 'edit' ? 'Update Post' : 'Create New Post'}
      </h2>
      <form className='container' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            autoFocus={true}
            className='form-control'
            maxLength={100}
            name='title'
            id='title'
            onChange={handleInputs}
            required={true}
            value={inputs.title}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='content' className='form-label'>
            Content
          </label>
          <textarea
            name='content'
            id='content'
            cols='30'
            className='form-control'
            rows='10'
            maxLength={200}
            onChange={handleInputs}
            value={inputs.content}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='images' className='form-label'>
            Images
          </label>
          <input
            type='file'
            name='images'
            multiple={true}
            maxLength={10}
            id='images'
            accept='image/*'
            value={files.value}
            onChange={handleFileInput}
          />
        </div>
        <input
          type='submit'
          value={action === 'edit' ? 'Update Post' : 'Create Post'}
          className='btn btn-success mt-5'
        />
      </form>
    </>
  );
};

export default Form;
