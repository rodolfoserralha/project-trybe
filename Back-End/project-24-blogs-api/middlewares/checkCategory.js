const { Category } = require('../sequelize/models');

const invalidCategories = { message: '"categoryIds" not found' };

module.exports = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categories = await Category.findAll();
  const categoriesId = await categories.map((c) => c.id);
  const existCategories = await categoryIds.every((id) => categoriesId.includes(id));
  
  if (!existCategories) return res.status(400).json(invalidCategories);

  next();
};