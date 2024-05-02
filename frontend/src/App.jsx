import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import 'jquery';
import 'bootstrap';
import './App.css';
import Index from './pages/dashboard/Index';
import Navbar from './layouts/Navbar';
import Comments from './pages/comments/Comments';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import EditPost from './pages/posts/EditPost';
import NewPost from './pages/posts/NewPost';
import ShowPost from './pages/posts/ShowPost';
import StoryIndex from './pages/stories/StoryIndex';
import ShowStory from './pages/stories/ShowStory';
import EditStory from './pages/stories/EditStory';
import NewStory from './pages/stories/NewStory';
import EditUser from './pages/user/EditUser';
import Profile from './pages/user/Profile';
import LogedInCheck from './components/LogedInCheck';
import Following from './pages/userFollower/Following';
import { useSelector } from 'react-redux';
import { Error } from './shared/Error';
import { Message } from './shared/Message';
import E_404 from './components/E_404';

function App() {
  var { message } = useSelector((state) => state.message);
  var { error } = useSelector((state) => state.error);
  return (
    <BrowserRouter>
      <Navbar />
      <Error error={error} />
      <Message msg={message} />
      <Routes>
        <Route
          path='/login'
          element={
            <LogedInCheck>
              <Login />
            </LogedInCheck>
          }
        />
        <Route
          path='/signup'
          element={
            <LogedInCheck>
              <Signup />
            </LogedInCheck>
          }
        />
        <Route
          path='/user/edit'
          element={
            <AuthenticatedRoute>
              <EditUser />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/user/:id/profile'
          element={
            <AuthenticatedRoute>
              <Profile />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/user/:id/followings'
          element={
            <AuthenticatedRoute>
              <Following />
            </AuthenticatedRoute>
          }
        />

        <Route
          path='/'
          element={
            <AuthenticatedRoute>
              <Index />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/posts/:id/comments'
          element={
            <AuthenticatedRoute>
              <Comments />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/posts/:id/edit'
          element={
            <AuthenticatedRoute>
              <EditPost />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/posts/new'
          element={
            <AuthenticatedRoute>
              <NewPost />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/posts/:id/show'
          element={
            <AuthenticatedRoute>
              <ShowPost />
            </AuthenticatedRoute>
          }
        />

        <Route
          path='/stories'
          element={
            <AuthenticatedRoute>
              <StoryIndex />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/stories/:id/show'
          element={
            <AuthenticatedRoute>
              <ShowStory />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/stories/:id/edit'
          element={
            <AuthenticatedRoute>
              <EditStory />
            </AuthenticatedRoute>
          }
        />
        <Route
          path='/stories/new'
          element={
            <AuthenticatedRoute>
              <NewStory />
            </AuthenticatedRoute>
          }
        />
        <Route path='*' element={<E_404 />} />
        <Route path='/404' element={<E_404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
