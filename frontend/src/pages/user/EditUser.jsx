import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from '../../helpers/getCurrentUser';
import { updateUserAction } from '../../reduxState/actions/userActions';

const EditUser = () => {
  let user = currentUser();
  let dispatcher = useDispatch();

  let [inputs, setInputs] = useState({
    email: user.email,
    user_type: user.user_type,
  });

  let [picture, setPicture] = useState({});
  let handleInputs = (e) => {
    let { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  let handleFile = (e) => {
    let { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: e.target.files[0],
    });

    setPicture({
      [name]: e.target.files[0],
      value: value,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData();

    Object.keys(inputs).forEach((element) => {
      if (inputs[element] !== '') {
        form.append(element, inputs[element]);
      }
    });
    dispatcher(updateUserAction(form, user.id));
  };
  return (
    <>
      <h2 className='text-center'>Edit User</h2>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            {user.profile_picture && (
              <img
                src={JSON.parse(user.profile_picture).url}
                alt='profile'
                className='rounded-circle profile-picture'
              />
            )}
            <hr />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Profile Picture:</label>
            <input
              type='file'
              name='profile_picture'
              value={picture.value}
              id='profile_picture'
              onChange={handleFile}
              className='form-control'
              accept='image/*'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <br />
            <input
              type='email'
              name='email'
              value={inputs.email}
              autoFocus={true}
              autoComplete='email'
              onChange={handleInputs}
              className='form-control'
              id='email'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <i>(leave blank if you don't want to change it)</i>
            <br />
            <input
              type='password'
              className='form-control'
              minLength={6}
              name='password'
              id='password'
              onChange={handleInputs}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='passwordConfirmation' className='form-label'>
              Confirm Password
            </label>
            <input
              type='password'
              className='form-control'
              minLength={6}
              name='passwordConfirmation'
              onChange={handleInputs}
              id='passwordConfirmation'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='currentPassword' className='form-label'>
              Current Password
            </label>
            <i>(we need your current password to confirm your changes)</i>
            <br />
            <input
              type='password'
              className='form-control'
              minLength={6}
              name='currentPassword'
              id='passwordConfirmation'
              onChange={handleInputs}
              required={true}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='user_type' className='form-label'>
              User Type
            </label>
            <select
              value={inputs.user_type}
              name='user_type'
              className='form-control'
              id='user_type'
              onChange={handleInputs}
            >
              <option value='public'>Public</option>
              <option value='private'>Private</option>
            </select>
          </div>
          <div className='actions'>
            <input type='submit' value='Update' className='btn btn-success' />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUser;
