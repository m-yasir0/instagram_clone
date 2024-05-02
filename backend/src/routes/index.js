const express = require('express');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const userFollowerRoutes = require('./userFollowerRoutes');
const storyRoutes = require('./storyRoutes');

class MainRouter {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    // routes namespace
    this.router.use('/user', userRoutes);
    this.router.use('/posts', postRoutes);
    this.router.use('/comments', commentRoutes);
    this.router.use('/following', userFollowerRoutes);
    this.router.use('/stories', storyRoutes);
  }
}
module.exports = new MainRouter().router;
