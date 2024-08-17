const Event = require('../models/Event');

const getEventStatistics = async (req, res) => {
  try {
    const events = await Event.find().populate('participants');
    const stats = events.map((event) => ({
      name: event.name,
      participantCount: event.participants.length,
    }));
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getEventStatistics };
