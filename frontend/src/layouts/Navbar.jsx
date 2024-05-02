import React from 'react';
import { Link } from 'react-router-dom';
import { currentUser } from '../helpers/getCurrentUser';

export default function Navbar() {
  let handleLogout = () => {
    if (window.confirm('Are you sure you want to Sign out?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      {
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-3'>
          <div className='container-fluid'>
            <Link
              to={`/user/${currentUser().id}/profile`}
              className='navbar-brand'
            >
              {currentUser().email}
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/'>
                    Posts
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/stories'>
                    Stories
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    to={`/user/${currentUser().id}/profile`}
                  >
                    Profile
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/posts/new'>
                    New Post
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/stories/new'>
                    New Story
                  </Link>
                </li>
              </ul>
              <ul className='mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <button
                    className='nav-link btn btn-light p-2'
                    onClick={() => handleLogout()}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      }
    </>
  );
}
