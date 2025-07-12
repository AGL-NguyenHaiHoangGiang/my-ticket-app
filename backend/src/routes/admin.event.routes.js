const express = require('express');
const router = express.Router();
const adminEventController = require('../controllers/admin.event.controller');

router.post('/new', adminEventController.addEvent);
router.delete('/:id', adminEventController.deleteEvent);

module.exports = router;