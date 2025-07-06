const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { jwtSecret, jwtExpiresIn } = require('../configs/jwt.config');

exports.signup = async (req, res) => {
  try {
    const { email, password} = req.body;

    // Kiểm tra trùng email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({
      email,
      password: hashedPassword,
      roles: ['CUSTOMER'],
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        roles: newUser.roles,
        status: newUser.status,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password} = req.body;

    // Kiểm tra user tồn tại
    const existingUser = await User.findOne({ email});
    
    if (!existingUser)
      return res.status(401).json({ error: 'Invalid email or password' });
    
    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    
    if (!isPasswordValid) 
      return res.status(401).json({ error: 'Invalid email or password' });
    
    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      roles: existingUser.roles,
    }
    
    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
    
    return res.status(200).json({
      message: 'Login successful',
      token: token
    })
    
  } catch (err) {
    if (res.statusCode !== 401) 
    res.status(500).json({ error: err.message });
  }
};