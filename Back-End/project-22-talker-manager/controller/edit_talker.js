const fs = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await fs.readFile('talker.json', 'utf-8');
    const parsedData = JSON.parse(data);
    const talkerIndex = parsedData.find((t) => t.id === parseInt(id, 10));
    const updatedTalker = { id: parseInt(id, 10), name, age, talk };
    parsedData.splice(talkerIndex, 1, updatedTalker);
    const stringifiedTalkers = JSON.stringify(parsedData, null, 2);
    await fs.writeFile('talker.json', stringifiedTalkers);
    return res.status(200).json(updatedTalker);
  } catch (error) {
    return next(error);
  }
};