const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = await Event.create({ title, description, date, createdBy: req.user._id });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
