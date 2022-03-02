const express = require('express');
const bodyParser = require('body-parser');
const getTalker = require('./controller/get_talker');
const getTalkerById = require('./controller/get_talker_id');
const createLogin = require('./controller/create_login');
const checkEmail = require('./middleware/check_email');
const checkPassword = require('./middleware/check_password');
const checkToken = require('./middleware/check_talker_token');
const checkName = require('./middleware/check_name');
const checkAge = require('./middleware/check_age');
const checkTalk = require('./middleware/check_talk');
const createTalker = require('./controller/create_talker');
const editTalker = require('./controller/edit_talker');
const deleteTalker = require('./controller/delete_talker');
const searchTalker = require('./controller/search_talker');
const checkError = require('./middleware/check_error');

//
const app = express();
app.use(bodyParser.json());

app.get('/talker', getTalker);
app.get('/talker/search', checkToken, searchTalker);
app.get('/talker/:id', getTalkerById);
app.post('/login', checkEmail, checkPassword, createLogin);
app.post('/talker',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  createTalker);

app.put('/talker/:id',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  editTalker);

app.delete('/talker/:id',
  checkToken,
  deleteTalker);

app.use(checkError);
  
  const HTTP_OK_STATUS = 200;
  const PORT = '3000';
  
  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
  });
  
  app.listen(PORT, () => {
  console.log('Online');
});
