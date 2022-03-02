const products = require('../models/products');

const getProducts = async (req, res, _next) => {
  const result = await products.getProducts();

  return res.status(200).json(result);
};

const getProductsById = async (req, res, _next) => {
  const { id } = req.params;

  const result = await products.getProductsById(id);

  if (!result.length) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result[0]);
};

const createProducts = async (req, res, _next) => {
  const { name, quantity } = req.body;

  const searchProduct = await products.searchProductByName(name);

  if (searchProduct) return res.status(409).json({ message: 'Product already exists' });

  const productSuccess = await products.createProducts(name, quantity);

  return res.status(201).json(productSuccess);
};

const updateProducts = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const search = await products.getProductsById(id);
  if (!search.length) return res.status(404).json({ message: 'Product not found' });

  const update = await products.updateProducts(id, name, quantity);
  return res.status(200).json(update);
};

const deleteProducts = async (req, res, _next) => {
  const { id } = req.params;

  const search = await products.getProductsById(id);
  if (!search.length) return res.status(404).json({ message: 'Product not found' });

  await products.deleteProducts(id);

  return res.status(204).json();
};

module.exports = { 
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};