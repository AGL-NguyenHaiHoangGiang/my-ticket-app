const Event = require('../models/event.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const EventDetail = require('../models/event-details.model');

const { jwtSecret, jwtExpiresIn } = require('../configs/jwt.config');

exports.addEvent = async (req, res) => {
  try {
    
    const {
      day,
      name, url, 
      venue, address, location,
      showings,
      title, bannerURL,
      imageUrl, categories,
      description, 
      orgLogoUrl, price, orgName, orgDescription 
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
      day: day,
      description : description,
      orgLogoUrl: orgLogoUrl,
      price: price || 0,
      version: '1.1.0',
      location: location || "Hồ Chí Minh",
    });
    
    const savedEvent = await newEvent.save();
    
    if (!savedEvent) {
      return res.status(500).json({ error: 'Failed to create event' });
    }
    
    const eventDetail = new EventDetail({
      title: title,
      url: url.toLowerCase(),
      bannerURL: bannerURL,
      logoURL: orgLogoUrl,
      day: day,
      venue: venue,
      address: address,
      description: description,
      orgName: orgName,
      isFree: price === 0,
      showings: showings,
      originalId_v2: savedEvent._id,
    });
    
    const savedEventDetail = await eventDetail.save();
    
    if (!savedEventDetail) {
      return res.status(500).json({ error: 'Failed to create event detail' });
    }
    
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
    
    const event = await Event.updateOne(
      { _id: id }, 
      { $set: { deletedAt: new Date() } }
    );
    
    if (event.nModified === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    return res.status(200).json({
      message: 'Delete event successfully',
      body: {id}
    })
    
  } catch (err) {
    if (res.statusCode !== 401) 
    res.status(500).json({ error: err.message });
  }
};

exports.updateEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id },
      { $set: updateData }
    )
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    return res.status(200).json({
      message: 'Event updated successfully',
      body: updatedEvent
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({ _id: id});
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    let eventDetail;
    
    if (event.version === '1.1.0') 
      eventDetail = await EventDetail.findOne({ originalId: event._id });
    else 
      eventDetail = await EventDetail.findOne({ originalId: event.originalId });
    
    if (!eventDetail) {
      return res.status(404).json({ error: 'Event details not found' });
    }
    
    return res.status(200).json({
      message: 'Event retrieved successfully',
      body: eventDetail
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

exports.getAllEvents = async (req, res) => {
  try {
  
    const page = parseInt(req.query.page) || 1; // Trang hiện tại
    const limit = parseInt(req.query.limit) || 10; // Số lượng sự kiện mỗi trang
    const skip = (page - 1) * limit; // Số lượng bản ghi cần bỏ qua
  
    const events = await EventDetail
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({startTime: -1 });
    
    if (!events || events.length === 0) {
      return res.status(404).json({ error: 'No events found' });
    }
    
    return res.status(200).json({
      message: 'Events retrieved successfully',
      body: events
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

exports.getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ url: slug.toLowerCase() });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    const eventDetail = await EventDetail.findOne({ url: slug });
    
    if (!eventDetail) {
      return res.status(404).json({ error: 'Event details not found' });
    }
    
    return res.status(200).json({
      message: 'Event retrieved successfully',
      body: eventDetail
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}