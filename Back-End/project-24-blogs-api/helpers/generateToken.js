const jwt = require('jsonwebtoken');

module.exports = (data = {}) => { 
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  console.log(data);
  
  const token = jwt.sign(
    { data },
    process.env.JWT_SECRET,
    jwtConfig,
  );
  
  return token;
};
