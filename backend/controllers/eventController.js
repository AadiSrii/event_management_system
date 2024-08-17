const Event = require('../models/Event'); // Assuming you have an Event model

// Create a new event
exports.createEvent = async (req, res) => {
  console.log('Request body:', req.body); // Log the request body
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error('Error saving event:', err);
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// Update an existing event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ message: 'Error updating event', error });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(400).json({ message: 'Error deleting event', error });
  }
};

// Get a single event by ID
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(400).json({ message: 'Error fetching event', error });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(400).json({ message: 'Error fetching events', error });
  }
};

// Search events with text query
exports.searchEvents = async (req, res) => {
  try {
    const { search } = req.query; // Extract search query
    let query = {};

    if (search) {
      query = { $text: { $search: search } }; // Perform text search
    }

    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    console.error('Error searching events:', error);
    res.status(400).json({ message: 'Error searching events', error });
  }
};
