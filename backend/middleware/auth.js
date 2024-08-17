const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Log the decoded token
      req.user = await User.findById(decoded.id);
      console.log('User from DB:', req.user); // Log the user from DB
      if (!req.user || (requiredRole && req.user.role !== requiredRole)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    } catch (err) {
      console.error('Error verifying token:', err); // Log the error
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = auth;
