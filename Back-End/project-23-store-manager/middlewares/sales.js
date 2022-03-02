const validateSales = (req, res, next) => {
  let productId = '';
  let quantity = '';

  if (req.body.length) {
      productId = req.body[0].productId;
      quantity = req.body[0].quantity;
  } else {
      productId = req.body.productId;
      quantity = req.body.quantity;
  }

  const message422 = { message: '"quantity" must be greater than or equal to 1' };

  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  if (quantity <= 0) return res.status(422).json(message422);
  return next();
};

module.exports = { validateSales };