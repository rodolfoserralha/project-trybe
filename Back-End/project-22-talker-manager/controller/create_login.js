const crypto = require('crypto');

module.exports = (req, res, _next) => {
  const id = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token: id });
};
