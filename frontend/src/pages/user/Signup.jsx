import axios from 'axios';
import jwt from 'jwt-decode';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { USER_URL } from '../../appConstants';
import { setErrorAction } from '../../reduxState/actions/errorActions';

const Signup = () => {
  let dispatcher = useDispatch();
  let [inputs, setInputs] = useState({});

  let handleInputs = (e) => {
    let { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  let signup = async () => {
    try {
      let response = await axios.post(`${USER_URL}/signup`, inputs);
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...response.data,
          decoded: jwt(response.data.token),
        })
      );
      window.location.reload();
    } catch (e) {
      dispatcher(
        setErrorAction(
          e.response.data.error.messages
            ? e.response.data.error.messages
            : e.message
        )
      );
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.passwordConfirmation) {
      setErrorAction('Password and password confirmation dont match');
    } else {
      await signup();
    }
  };

  return (
    <>
      <h2 class='text-center'>Sign up</h2>
      <div class='container'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              autoFocus={true}
              className='form-control'
              name='email'
              id='email'
              onChange={handleInputs}
              required={true}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              minLength={6}
              name='password'
              id='password'
              onChange={handleInputs}
              required={true}
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
              required={true}
            />
          </div>
          <input type='submit' value='Sign up' className='btn btn-success' />
        </form>
      </div>
    </>
  );
};

export default Signup;
