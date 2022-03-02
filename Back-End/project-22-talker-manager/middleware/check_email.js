const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!(email.includes('@') && email.includes('.com'))) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

module.exports = validateEmail;