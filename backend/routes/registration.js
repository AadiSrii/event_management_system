const express = require('express');
const router = express.Router();
const { registerForEvent, cancelRegistration } = require('../controllers/registrationController');
const auth = require('../middleware/auth');

router.post('/', auth('User'), registerForEvent);
router.post('/cancel', auth('User'), cancelRegistration);

module.exports = router;
