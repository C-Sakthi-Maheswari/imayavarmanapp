// server/controllers/authController.js

const users = [
  { email: 'admin@example.com', password: '1234', role: 'admin' },
  { email: 'student1@example.com', password: '1234', role: 'student', id: 1 },
  { email: 'student2@example.com', password: '1234', role: 'student', id: 2 },
];

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Send back only necessary data
  const userData = {
    email: user.email,
    role: user.role,
    id: user.id || null
  };

  res.json(userData);
};
