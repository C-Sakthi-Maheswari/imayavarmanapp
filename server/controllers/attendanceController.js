const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;
    const record = await Attendance.create({ student: studentId, status });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("student", "name email");
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
