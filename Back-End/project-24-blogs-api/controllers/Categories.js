const { Category } = require('../sequelize/models');

const createCategory = async (req, res, _next) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });
    const create = await Category.create({ name });
  
    return res.status(201).json(create);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getCategories = async (_req, res, _next) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createCategory,
  getCategories,
};