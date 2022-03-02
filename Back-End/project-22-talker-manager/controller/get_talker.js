const fs = require('fs/promises');

module.exports = async (_req, res, next) => {
  try {
    const talkerList = await fs.readFile('talker.json', 'utf-8');
    const parsedTalkerList = JSON.parse(talkerList);

    if (parsedTalkerList.length < 1) return res.status(200).json([]);

    return res.status(200).json(parsedTalkerList);
  } catch (error) {
    return next(error);
  }
};