export const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated && req.user.role === 'staff') {
      return next();
    }
    res.status(403).json({ message: 'Forbidden' });
  };