const fs = require('fs');
const path = require('path');

const studentFile = path.join(__dirname, '../data/students.json');
const eventFile = path.join(__dirname, '../data/events.json');

const loadData = file => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : []);
const saveData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

exports.dashboard = (req, res) => res.json({ message: 'Welcome to Admin Dashboard' });

exports.getAllStudents = (req, res) => res.json(loadData(studentFile));

exports.addStudent = (req, res) => {
  const students = loadData(studentFile);
  const newStudent = req.body;
  newStudent.id = Date.now();
  students.push(newStudent);
  saveData(studentFile, students);
  res.json({ message: 'Student added', student: newStudent });
};

exports.deleteStudent = (req, res) => {
  let students = loadData(studentFile);
  students = students.filter(s => s.id != req.params.id);
  saveData(studentFile, students);
  res.json({ message: 'Student deleted' });
};

exports.getAllEvents = (req, res) => res.json(loadData(eventFile));

exports.addEvent = (req, res) => {
  const events = loadData(eventFile);
  const newEvent = req.body;
  newEvent.id = Date.now();
  events.push(newEvent);
  saveData(eventFile, events);
  res.json({ message: 'Event added', event: newEvent });
};
