const fs = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const talkerList = await fs.readFile('talker.json', 'utf-8');
    const parsedTalkerList = JSON.parse(talkerList);
    const talker = parsedTalkerList.find((t) => t.id === parseInt(id, 10));
  
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
  } catch (error) {
    return next(error);
  }
};
