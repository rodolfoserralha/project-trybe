const express = require('express');
const { createLogin } = require('../controllers/Login');
const { checkEmailLogin, checkPasswordLogin } = require('../middlewares/checkLogin');

const router = express.Router();

router.post(
  '/',
  checkEmailLogin,
  checkPasswordLogin,
  createLogin,
);

module.exports = router;