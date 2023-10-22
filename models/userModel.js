const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
  const values = [username, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = {
  createUser,
  getUserByUsername,
};
