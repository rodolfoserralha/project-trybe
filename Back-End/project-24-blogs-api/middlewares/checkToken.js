const jwt = require('jsonwebtoken');

const tokenNotFound = { message: 'Token not found' };
const tokenInvalid = { message: 'Expired or invalid token' };

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
  
    if (!authorization) return res.status(401).json(tokenNotFound);
  
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    
    req.tokenData = decoded.data;

    next();
  } catch (error) {
    if (error.name.includes('Token')) return res.status(401).json(tokenInvalid);
    next(error);
  }
};
