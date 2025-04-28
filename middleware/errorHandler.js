const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
  
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
  
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(e => ({
        field: e.path,
        message: e.message
      }));
      return res.status(400).json({ errors });
    }
  
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Duplicate entry' });
    }
  
    res.status(500).json({ error: 'Internal server error' });
  };
  
  module.exports = errorHandler;