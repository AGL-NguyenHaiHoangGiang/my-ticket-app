const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller')

const authMiddleware = require('../middlewares/authMiddleware');    
const authorizeRoles = require('../middlewares/authRolesMiddleware');

router.get('/my-bookings',  
    authMiddleware,
    authorizeRoles(['CUSTOMER']),
    userController.getAllBooking
)

module.exports = router;