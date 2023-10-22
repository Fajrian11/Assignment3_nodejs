const pool = require('../config/db');

const createPhoto = async (title, url) => {
  const query = 'INSERT INTO photos (title, url) VALUES ($1, $2) RETURNING *';
  const values = [title, url];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

const getAllPhotos = async () => {
  const query = 'SELECT * FROM photos';
  const { rows } = await pool.query(query);
  return rows;
}

const getPhotoById = async (id) => {
  const query = 'SELECT * FROM photos WHERE id = $1';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = {
  createPhoto,
  getAllPhotos,
  getPhotoById,
};
