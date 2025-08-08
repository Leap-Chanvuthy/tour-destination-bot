// seed.js
require('dotenv').config();
const mongoose = require('mongoose');

const Province = require('./src/models/provinceModel');
const Category = require('./src/models/categoryModel');
const Place = require('./src/models/placeModel');

const provinces = [
  { name: 'Phnom Penh', description: 'Capital city of Cambodia.', image: 'https://example.com/phnompenh.jpg' },
  { name: 'Siem Reap', description: 'Home to Angkor Wat.', image: 'https://example.com/siemreap.jpg' },
  { name: 'Battambang', description: 'Known for colonial architecture.', image: 'https://example.com/battambang.jpg' },
];

const categories = [
  { name: 'Hotel', command: '/hotel', description: 'Find best hotels', icon: '🏨' },
  { name: 'Best Food', command: '/bestfood', description: 'Top local restaurants', icon: '🍜' },
  { name: 'Historical Place', command: '/history', description: 'Visit historical sites', icon: '🏛️' },
];

const places = [
  {
    provinceName: 'Siem Reap',
    categoryName: 'Hotel',
    name: 'Angkor Paradise Hotel',
    description: 'A luxury hotel near Angkor Wat.',
    location: { latitude: 13.3633, longitude: 103.8564 },
    images: ['https://example.com/angkorparadise.jpg'],
    priceRange: { min: 50, max: 150 },
    rating: 4.5,
    link: 'https://maps.google.com/?q=Angkor+Paradise+Hotel'
  },
  {
    provinceName: 'Siem Reap',
    categoryName: 'Best Food',
    name: 'Chanrey Tree',
    description: 'Authentic Khmer cuisine.',
    location: { latitude: 13.3575, longitude: 103.8597 },
    images: ['https://example.com/chanreytree.jpg'],
    priceRange: { min: 5, max: 20 },
    rating: 4.8,
    link: 'https://maps.google.com/?q=Chanrey+Tree'
  },
  {
    provinceName: 'Phnom Penh',
    categoryName: 'Historical Place',
    name: 'Royal Palace',
    description: 'The royal residence of the King of Cambodia.',
    location: { latitude: 11.5637, longitude: 104.9318 },
    images: ['https://example.com/royalpalace.jpg'],
    rating: 4.7,
    link: 'https://maps.google.com/?q=Royal+Palace+Phnom+Penh'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    console.log('Connected to MongoDB...');

    // Clear old data
    await Province.deleteMany();
    await Category.deleteMany();
    await Place.deleteMany();

    // Insert provinces & categories
    const createdProvinces = await Province.insertMany(provinces);
    const createdCategories = await Category.insertMany(categories);

    // Link places with province/category IDs
    const placeDocs = places.map(place => {
      const province = createdProvinces.find(p => p.name === place.provinceName);
      const category = createdCategories.find(c => c.name === place.categoryName);

      return {
        province: province._id,
        category: category._id,
        name: place.name,
        description: place.description,
        location: place.location,
        images: place.images,
        priceRange: place.priceRange,
        rating: place.rating,
        link: place.link,
      };
    });

    await Place.insertMany(placeDocs);

    console.log('✅ Database seeding completed!');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    mongoose.connection.close();
  }
};

seedDatabase();
