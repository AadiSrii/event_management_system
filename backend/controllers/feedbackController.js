const Feedback = require('../models/Feedback');
const Event = require('../models/Event');

const addFeedback = async (req, res) => {
  try {
    const { eventId, rating, comment } = req.body;
    const feedback = new Feedback({ event: eventId, user: req.user.id, rating, comment });
    await feedback.save();

    const event = await Event.findById(eventId);
    event.feedback.push(feedback);
    await event.save();

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getFeedbackForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const feedback = await Feedback.find({ event: eventId }).populate('user');
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { addFeedback, getFeedbackForEvent };
