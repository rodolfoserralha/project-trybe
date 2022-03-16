const requiredEmail = { message: '"email" is required' };
const requiredPassword = { message: '"password" is required' };
const emptyEmail = { message: '"email" is not allowed to be empty' };
const emptyPassword = { message: '"password" is not allowed to be empty' };
const invalidFields = { message: 'Invalid fields' };
const { User } = require('../sequelize/models');

const checkEmailLogin = async (req, res, next) => {
  const { email } = req.body;
  if (email === '') return res.status(400).json(emptyEmail);

  if (!email) return res.status(400).json(requiredEmail);

  const userExists = await User.findOne({ where: { email } });

  if (!userExists) return res.status(400).json(invalidFields);

  req.body.user = userExists;
  next();
};

const checkPasswordLogin = async (req, res, next) => {
  const { password } = req.body;
  
  if (password === '') return res.status(400).json(emptyPassword);
  if (!password) return res.status(400).json(requiredPassword);
  next();
};

module.exports = {
  checkEmailLogin,
  checkPasswordLogin,
};