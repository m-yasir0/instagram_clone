import axios from 'axios';
import React, { useState } from 'react';
import jwt from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_URL } from '../../appConstants';
import { setErrorAction } from '../../reduxState/actions/errorActions';

const Login = () => {
  let dispatcher = useDispatch();
  let [inputs, setInputs] = useState({});

  let handleInputs = (e) => {
    let { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  let login = async () => {
    try {
      let response = await axios.post(`${USER_URL}/signin`, inputs);
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
    await login();
  };

  return (
    <>
      <h2 className='text-center'>Log in</h2>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              id='email'
              required={true}
              onInput={handleInputs}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              name='password'
              id='password'
              required={true}
              onInput={handleInputs}
            />
          </div>

          <input type='submit' value='Log in' className='btn btn-success' />
        </form>
        <Link to={'/signup'}>Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
