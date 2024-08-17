const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const EventController = require('../controllers/eventController');

// Create a new event - requires authentication
router.post('/create', auth(['admin', 'user']), EventController.createEvent);

// Update an event - requires authentication
router.put('/:id', auth(['admin', 'user']), EventController.updateEvent);

// Delete an event - requires authentication
router.delete('/:id', auth(['admin', 'user']), EventController.deleteEvent);

// Get a single event by ID - requires authentication
router.get('/:id', auth(['admin', 'user']), EventController.getEvent);

// Get all events - requires authentication
router.get('/', auth(['admin', 'user']), EventController.getAllEvents);

// Search events - requires authentication
router.get('/search', auth(['admin', 'user']), EventController.searchEvents);

module.exports = router;
