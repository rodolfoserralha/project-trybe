const express = require('express');
const middlewares = require('../middlewares');
const { createUser, getUser, getUserById, deleteUser } = require('../controllers/User');

const router = express.Router();

router.post(
  '/',
  middlewares.checkEmail,
  middlewares.checkNameLength,
  middlewares.checkPassword,
  createUser,
);

router.get(
  '/',
  middlewares.checkToken,
  getUser,
);

router.get(
  '/:id',
  middlewares.checkToken,
  getUserById,
);

router.delete(
  '/me',
  middlewares.checkToken,
  deleteUser,
);

module.exports = router;