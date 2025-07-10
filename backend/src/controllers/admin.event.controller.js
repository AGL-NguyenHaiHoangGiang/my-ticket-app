const Event = require('../models/event.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { jwtSecret, jwtExpiresIn } = require('../configs/jwt.config');

exports.addEvent = async (req, res) => {
  try {
    
    const { 
      name, url, 
      imageUrl, categories, day, deeplink, 
      isNewBookingFlow, originalId, description, 
      orgLogoUrl, price 
    } = req.body;
    
    if (!name || !url) {
      return res.status(400).json({ error: 'Name and URL are required' });
    }
    
    const existingEvent = await Event.findOne({ url: url.toLowerCase() });
    if (existingEvent) {
      return res.status(400).json({ error: 'Event with this URL already exists' });
    }

    const newEvent = new Event({
      name,
      url: url.toLowerCase(),
      imageUrl: imageUrl,
      categories: categories,
      day: day || new Date(Date.now()).toISOString(),
      deeplink: deeplink,
      isNewBookingFlow: isNewBookingFlow,
      originalId: originalId || null,
      description : description || '',
      orgLogoUrl: orgLogoUrl,
      price: price || 0,
    });
    
        return res.status(200).json({
      message: 'create event successfully',
      body: newEvent
    })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    
    const { id } = req.params;
    
    return res.status(200).json({
      message: 'Delete event successfully',
      body: {id}
    })
    
  } catch (err) {
    if (res.statusCode !== 401) 
    res.status(500).json({ error: err.message });
  }
};