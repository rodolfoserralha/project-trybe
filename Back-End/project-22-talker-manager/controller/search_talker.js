const fs = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    const { q } = req.query;

    const data = await fs.readFile('talker.json', 'utf-8');
    const parsedData = JSON.parse(data);

    if (!q || q === '') return res.status(200).json(parsedData);

    const filterQuery = parsedData.filter((t) => t.name.includes(q));
  
    return res.status(200).json(filterQuery);
  } catch (error) {
    return next(error);
  }
};