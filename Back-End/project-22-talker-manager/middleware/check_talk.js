const checkTalk = (req, res, next) => { 
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400)
      .json(
        { 
          message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      },
    );
  }
  return next();
};

const checkTalkerWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dataFormat = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!watchedAt.match(dataFormat)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const checkTalkerRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const possibleRates = [1, 2, 3, 4, 5];

  if (!possibleRates.includes(rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = [checkTalk, checkTalkerWatchedAt, checkTalkerRate];
