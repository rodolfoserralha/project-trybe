const express = require('express');
const { createBlogPost, getBlogPosts, 
  getBlogPostById, updateBlogPost, 
  deleteBlogPost, searchByQuery } = require('../controllers/BlogPost');
const middlewares = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  middlewares.checkBlogPosts,
  middlewares.checkCategory,
  middlewares.checkToken,
  createBlogPost,
);

router.get(
  '/',
  middlewares.checkToken,
  getBlogPosts,
);

router.get(
  '/search/',
  middlewares.checkToken,
  searchByQuery,
);

router.get(
  '/:id',
  middlewares.checkToken,
  getBlogPostById,
);

router.put(
  '/:id',
  middlewares.checkToken,
  middlewares.checkUpdatePosts,
  middlewares.checkDeletePost,
  updateBlogPost,
);

router.delete(
  '/:id',
  middlewares.checkToken,
  middlewares.checkDeletePost,
  deleteBlogPost,
);

module.exports = router;