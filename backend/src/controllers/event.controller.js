const {CATEGORIES, REQ_LOCATIONS, RES_LOCATIONS} = require('../utils/enums')
const {requestToresponseLocation} = require('../utils/location.mapper');

const Event = require('../models/event.model');
const EventDetails = require('../models/event-details.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllEvents = async (req, res) => {
  try {
  
    const page = parseInt(req.query.page) || 1; // Trang hiện tại
    const limit = parseInt(req.query.limit) || 10; // Số lượng sự kiện mỗi trang
    const skip = (page - 1) * limit; // Số lượng bản ghi cần bỏ qua
    
    const{ location, isFree, category, startDate, endDate } = req.query;
    const filter = {};
    
    // Kiểm tra và xử lý các tham số lọc
    if (location && !Object.values(REQ_LOCATIONS).includes(location)) {
      return res.status(400).json({ error: 'Invalid location' });
    }
    
    if (category && !Object.values(CATEGORIES).includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    if (startDate && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ error: 'Invalid start Date' });
    }
    
    if (endDate && isNaN(Date.parse(endDate))) {
      return res.status(400).json({ error: 'Invalid end Date' });
    }
    
    // Tạo bộ lọc dựa trên các tham số
    if (location && location != REQ_LOCATIONS.TOAN_QUOC ) {
      const locationRegex = new RegExp(requestToresponseLocation(location), 'i'); 
      filter.address = { $regex: locationRegex };
    }
    if (isFree) filter.isFree = isFree === 'true';
    if (category) filter.categories = { $in: [category] };
    if (startDate) filter.day = { $gte: new Date(startDate) };
    if (endDate) filter.day = { ...filter.day, $lt: new Date(endDate).setDate(new Date(endDate).getDate() + 1) };
    
        
    const eventList = await Event
        .find(filter)
        .skip(skip)
        .limit(limit);
        
    const totalEvents = await Event.countDocuments(filter);
    const totalPages = Math.ceil(totalEvents / limit);
            
    if (!eventList || eventList.length === 0) 
      return res.status(200).json({ 
        message: 'No event found',
        body: []      
    });
    
    return res.status(200).json({
      message: 'Events retrieved successfully',
      body: eventList,
      totalPages,
      currentPage: page,
    })
    
  } catch (err) {
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