const Event = require('../models/Event');
const User = require('../models/User');

const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.participants.length >= event.participantLimit) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.participants.push(userId);
    await event.save();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.participants = event.participants.filter(participant => participant.toString() !== userId.toString());
    await event.save();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerForEvent, cancelRegistration };
