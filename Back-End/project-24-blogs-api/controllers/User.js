const generateToken = require('../helpers/generateToken');
const { User } = require('../sequelize/models');

const createUser = async (req, res, _next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const result = await User.create({ displayName, email, password, image });

    const token = generateToken({ id: result.id, email });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getUser = async (req, res, _next) => {
  try {
    const getUsers = await User.findAll();

    return res.status(200).json(getUsers);   
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getUserById = async (req, res, _next) => {
  try {
    const { id } = req.params;

    const getUserId = await User.findByPk(id);

    if (!getUserId) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(getUserId);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteUser = async (req, res, _next) => {
  const userId = req.tokenData.id;

  await User.destroy({ where: { id: userId } });

  return res.status(204).end();
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  deleteUser,
};