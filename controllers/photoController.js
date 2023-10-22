const photoModel = require('../models/photoModel');

const createPhoto = async (req, res) => {
  const { title, url } = req.body;
  try {
    const photo = await photoModel.createPhoto(title, url);
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllPhotos = async (req, res) => {
  try {
    const photos = await photoModel.getAllPhotos();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPhotoById = async (req, res) => {
  const id = req.params.id;
  try {
    const photo = await photoModel.getPhotoById(id);
    if (!photo) {
      res.status(404).json({ message: 'Photo not found' });
    } else {
      res.json(photo);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createPhoto,
  getAllPhotos,
  getPhotoById,
};
