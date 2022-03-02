const validateNameProducts = (req, res, next) => {
  const { name } = req.body;
  const message422 = { message: '"name" length must be at least 5 characters long' };

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) return res.status(422).json(message422);
  return next();
};

const validateQuantityProducts = (req, res, next) => {
  const { quantity } = req.body;
  const message422 = { message: '"quantity" must be greater than or equal to 1' };
  const message400 = { message: '"quantity" is required' };

  if (typeof quantity !== 'number') return res.status(400).json(message400);
  if (quantity <= 0) return res.status(422).json(message422);
  return next();
};

module.exports = { validateNameProducts, validateQuantityProducts };