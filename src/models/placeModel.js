const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Province',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    images: [String],
    priceRange: {
      min: { type: Number },
      max: { type: Number },
    },
    rating: { type: Number, min: 0, max: 5 },
    link: { type: String },
  },
  { timestamps: true, collection: 'places' }
);

module.exports = mongoose.model('Place', placeSchema);
