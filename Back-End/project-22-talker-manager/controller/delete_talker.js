const fs = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await fs.readFile('talker.json', 'utf-8');
    const parsedData = JSON.parse(data);
    const talkerIndex = parsedData.filter((t) => t.id !== parseInt(id, 10));

    const stringifiedTalkers = JSON.stringify(talkerIndex);
    await fs.writeFile('talker.json', stringifiedTalkers);
    return res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return next(error);
  }
};