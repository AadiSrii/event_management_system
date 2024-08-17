// routes/events.js
const express = require('express');
const router = express.Router();
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
  searchEvents
} = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.post('/', auth('admin'), createEvent);       // Protected: Create event
router.put('/:id', auth('admin'), updateEvent);     // Protected: Update event
router.delete('/:id', auth('admin'), deleteEvent);  // Protected: Delete event
router.get('/:id', getEvent);                       // Public: Get event by ID
router.get('/', getAllEvents);                      // Public: Get all events
router.get('/search', searchEvents);                // Public: Search events

module.exports = router;
