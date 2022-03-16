const Category = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Categories',
  });
  return Categories;
};

module.exports = Category;