const titleMessage = { message: '"title" is required' };
const contentMessage = { message: '"content" is required' };
const categoryEdited = { message: 'Categories cannot be edited' };

module.exports = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) return res.status(400).json(titleMessage);
  if (!content) return res.status(400).json(contentMessage);
  if (categoryIds) return res.status(400).json(categoryEdited);
  next();
};