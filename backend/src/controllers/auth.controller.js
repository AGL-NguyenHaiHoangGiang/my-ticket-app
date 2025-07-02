const User = require('../models/user.model');
const bcrypt = require('bcrypt');

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
