const checkEmail = require('./checkEmail');
const checkNameLength = require('./checkNameLength');
const checkPassword = require('./checkPassword');
const checkToken = require('./checkToken');
const checkBlogPosts = require('./checkBlogPosts');
const checkCategory = require('./checkCategory');
const checkUpdatePosts = require('./checkUpdatePosts');
const checkDeletePost = require('./checkDeletePost');

module.exports = {
  checkEmail,
  checkNameLength,
  checkPassword,
  checkToken,
  checkBlogPosts,
  checkCategory,
  checkUpdatePosts,
  checkDeletePost,
};