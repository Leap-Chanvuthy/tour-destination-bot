const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true, collection: 'provinces' }
);

module.exports = mongoose.model('Province', provinceSchema);
