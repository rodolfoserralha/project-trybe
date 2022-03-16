const generateToken = require('../helpers/generateToken');

const createLogin = async (req, res, _next) => {
  const { email } = req.body;
  const { id } = req.body.user;
  const token = generateToken({ email, id });

  return res.status(200).json({ token });
};

module.exports = {
  createLogin,
};