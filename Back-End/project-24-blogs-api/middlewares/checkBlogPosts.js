const titleMessage = { message: '"title" is required' };
const contentMessage = { message: '"content" is required' };
const categoryIdsMessage = { message: '"categoryIds" is required' };

module.exports = async (req, res, next) => {
  const { title, categoryIds, content } = req.body;

  if (!title) return res.status(400).json(titleMessage);
  if (!content) return res.status(400).json(contentMessage);
  if (!categoryIds) return res.status(400).json(categoryIdsMessage);

  next();
};