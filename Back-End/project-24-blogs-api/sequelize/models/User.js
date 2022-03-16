const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const User = (sequelize) => {
  const Users = sequelize.define('User', Attributes, {
    tableName: 'Users',
  });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPost, { foreignKey: 'id', as: 'posts' });
  };

  return Users;
};

module.exports = User;