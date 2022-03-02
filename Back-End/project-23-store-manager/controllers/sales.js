const sales = require('../models/sales');

const getSales = async (req, res, _next) => {
  const result = await sales.getSales();

  return res.status(200).json(result);
};

const getSalesById = async (req, res, _next) => {
  const { id } = req.params;

  const result = await sales.getSalesById(id);

  if (!result.length) return res.status(404).json({ message: 'Sale not found' });

  if (result.length === 1) return res.status(200).json(result[0]);
  return res.status(200).json(result);
};

const createSales = async (req, res, _next) => {
  const { body } = req;
  const salesSucess = await sales.createSales(body);
  return res.status(201).json(salesSucess);
};

const updateSales = async (req, res, _next) => {
  const { id } = req.params;

  const updatedSale = await sales.updateSales(req.body, id);
  return res.status(200).json(updatedSale);
};

module.exports = { getSales, getSalesById, createSales, updateSales };