module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories',
    {},
    { timestamps: false });

  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId', otherKey: 'categoryId', through: PostsCategories, as: 'categories',
    });

    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId', otherKey: 'postId', through: PostsCategories, as: 'blogPosts',
    });
  };

  return PostsCategories;
};