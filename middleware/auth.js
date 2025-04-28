const { verifyToken } = require('../utils/passwordUtils');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) { 
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;