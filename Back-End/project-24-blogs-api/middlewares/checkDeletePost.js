const { BlogPost, Category } = require('../sequelize/models');

const notExistUser = { message: 'Unauthorized user' };
const postNotExist = { message: 'Post does not exist' };

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.tokenData.id;

  const blogPost = await BlogPost.findByPk(id, {
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: { model: Category, as: 'categories' },
  }); 

  if (!blogPost) return res.status(404).json(postNotExist);
  if (blogPost.userId !== userId) return res.status(401).json(notExistUser);

  req.post = blogPost;
  next();
};