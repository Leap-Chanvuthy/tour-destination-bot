const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    command: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
  },
  { timestamps: true, collection: 'categories' }
);

module.exports = mongoose.model('Category', categorySchema);
