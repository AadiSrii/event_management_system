const express = require('express');
const router = express.Router();
const { addFeedback, getFeedbackForEvent } = require('../controllers/feedbackController');
const auth = require('../middleware/auth');

router.post('/', auth('User'), addFeedback);
router.get('/:eventId', getFeedbackForEvent);

module.exports = router;
