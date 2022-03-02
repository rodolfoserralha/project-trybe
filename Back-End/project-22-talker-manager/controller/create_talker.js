const fs = require('fs/promises');

module.exports = async (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    const data = await fs.readFile('talker.json', 'utf-8');
    const parsedData = JSON.parse(data);
  
    const newData = { id: (parsedData.length + 1), name, age, talk };
    parsedData.push(newData);
  
    const stringifiedData = JSON.stringify(parsedData);
  
    await fs.writeFile('talker.json', stringifiedData);
  
    return res.status(201).json(newData);
  } catch (error) {
    return next(error);
  }
};
