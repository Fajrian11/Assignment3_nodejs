const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Cek apakah username sudah digunakan
    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }

    // Buat pengguna baru
    const user = await userModel.createUser(username, password);

    // Buat token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, jwtConfig.secret, { expiresIn: '1h' });

    res.json({
      status: 200, 
      username: username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Cek apakah pengguna ada
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    // Bandingkan password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, jwtConfig.secret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
};
