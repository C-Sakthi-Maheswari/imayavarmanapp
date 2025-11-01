exports.isAdmin = (req, res, next) => {
  const { role } = req.body; // dummy: role from request body
  if (role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
};

exports.isStudent = (req, res, next) => {
  const { role } = req.body;
  if (role !== 'student') return res.status(403).json({ message: 'Access denied' });
  next();
};
