const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../sequelize/models');

const postNotExist = { message: 'Post does not exist' };

const createBlogPost = async (req, res, _next) => {
  try {
    const { title, content, categoryIds } = req.body;

    const data = new Date();

    const { id } = req.tokenData;

    const createPost = await BlogPost.create({ 
      title,
      content, 
      userId: id, 
      categoryIds, 
      published: data, 
      updated: data,
    });
  
    return res.status(201).json({ id: createPost.id, userId: id, title, content });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getBlogPosts = async (req, res, _next) => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exlude: ['password'] },
        }, {
          model: Category, as: 'categories', through: { attributes: [] },
        },
      ],
     });
  
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getBlogPostById = async (req, res, _next) => {
  try {
    const { id } = req.params;

    const postById = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exlude: ['password'] },
        }, {
          model: Category, as: 'categories', through: { attributes: [] },
        },
      ],
    });

    if (!postById) return res.status(404).json(postNotExist);

    return res.status(200).json(postById);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// const updateBlogPost = async (req, res, _next) => {
//   try {
//     const { id } = req.params;
//     const { title, content } = req.body;
//     const userId = req.tokenData.id;

//     const blogPost = await BlogPost.findByPk(id, {
//       attributes: { exclude: ['id', 'published', 'updated'] },
//       include: { model: Category, as: 'categories' },
//     }); 
    
//     if (blogPost.userId !== userId) return res.status(401).json(notExistUser);
//     if (!blogPost) return res.status(404).json(notExistPost);
    
//     await BlogPost.update({ title, content }, { where: { id } });
  
//     return res.status(200).json({ 
//       userId: blogPost.userId, title, content, categories: blogPost.categories });
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };

const updateBlogPost = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { post } = req;
    
    await BlogPost.update({ title, content }, { where: { id } });
  
    return res.status(200).json({ 
      userId: post.userId, title, content, categories: post.categories });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteBlogPost = async (req, res, _next) => {
  const { id } = req.params;
  
  await BlogPost.destroy({ where: { id } });

  return res.status(204).end();
};

const searchByQuery = async (req, res, _next) => {
  const { q } = req.query;

  const blogPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return res.status(200).json(blogPosts);
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  searchByQuery,
};