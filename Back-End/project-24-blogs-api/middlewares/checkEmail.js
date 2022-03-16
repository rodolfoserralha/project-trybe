const { User } = require('../sequelize/models');

const requiredEmail = { message: '"email" is required' };
const validEmail = { message: '"email" must be a valid email' };
const userRegistered = { message: 'User already registered' };

module.exports = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return res.status(400).json(requiredEmail);
  
  const userExists = await User.findOne({ where: { email } });
  
  if (userExists) return res.status(409).json(userRegistered);
  
  const validRegex = /\S+@\S+\.\S+/;

  if (!email.match(validRegex)) {
    return res.status(400).json(validEmail);
  }

  next();
};