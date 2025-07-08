const Event = require('../models/event.model');
const EventDetails = require('../models/event-details.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllEvents = async (req, res) => {
  try {
  
    const page = parseInt(req.query.page) || 1; // Trang hiện tại
    const limit = parseInt(req.query.limit) || 10; // Số lượng sự kiện mỗi trang
    const skip = (page - 1) * limit; // Số lượng bản ghi cần bỏ qua
    
    const eventList = await Event
        .find()
        .skip(skip)
        .limit(limit);
            
    if (!eventList || eventList.length === 0) 
      return res.status(404).json({ error: 'Event not found' });
    
    return res.status(200).json({
      message: 'Events retrieved successfully',
      body: eventList
    })
    
  } catch (err) {
    if (res.statusCode !== 401) 
    res.status(500).json({ error: err.message });
  }
};

exports.getEventBySlug = async (req, res) => {
  try {

    const eventDetails = await EventDetails.findOne({ url: req.params.slug });
    
    if (!eventDetails) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(200).json({
      message: 'Event details retrieved successfully',
      body: eventDetails,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};