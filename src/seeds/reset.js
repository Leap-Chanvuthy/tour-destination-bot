const mongoose = require('mongoose');
const config = require('../config/index');

const Province = require('../models/provinceModel');
const Category = require('../models/categoryModel');
const Place = require('../models/placeModel');

const resetDatabase = async () => {
  try {
    await mongoose.connect(config.mongodb_uri, {});

    console.log('Connected to MongoDB...');

    await Province.deleteMany();
    await Category.deleteMany();
    await Place.deleteMany();

    console.log('🗑️ All collections have been cleared.');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error resetting database:', err);
    mongoose.connection.close();
  }
};

resetDatabase();
