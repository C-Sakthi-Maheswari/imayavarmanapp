const fs = require('fs');
const path = require('path');

const studentFile = path.join(__dirname, '../data/students.json');
const loadStudents = () => (fs.existsSync(studentFile) ? JSON.parse(fs.readFileSync(studentFile)) : []);

exports.dashboard = (req, res) => res.json({ message: 'Welcome to Student Dashboard' });

exports.getProfile = (req, res) => {
  const students = loadStudents();
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};
