const express = require('express');
const middlewares = require('../middlewares');
const { getCategories, createCategory } = require('../controllers/Categories');

const router = express.Router();

router.post(
  '/',
  middlewares.checkToken,
  createCategory,
);

router.get(
  '/',
  middlewares.checkToken,
  getCategories,
);

module.exports = router;