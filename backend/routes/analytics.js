const express = require('express');
const router = express.Router();
const { getEventStatistics } = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

router.get('/statistics', auth('Admin'), getEventStatistics);

module.exports = router;
