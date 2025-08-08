const config = require('../config/index');
const mongoose = require('mongoose');
const Province = require('../models/provinceModel');
const Category = require('../models/categoryModel');
const Place = require('../models/placeModel');

const provinces = [
  "Phnom Penh","Banteay Meanchey","Battambang","Kampong Cham","Kampong Chhnang",
  "Kampong Speu","Kampong Thom","Kampot","Kandal","Kep","Koh Kong","Kratie",
  "Mondulkiri","Oddar Meanchey","Pailin","Preah Sihanouk","Preah Vihear","Pursat",
  "Prey Veng","Ratanakiri","Siem Reap","Stung Treng","Svay Rieng","Takeo","Tboung Khmum"
].map(name => ({ name }));

const categories = [
  { name: 'Historical Place', command: '/history', description: 'Visit historic or cultural sites', icon: '🏛️' },
  { name: 'Best Food', command: '/bestfood', description: 'Top local restaurants & dishes', icon: '🍜' },
  { name: 'Hotel', command: '/hotel', description: 'Recommended stays', icon: '🏨' }
];

const places = [
  {
    province: 'Siem Reap',
    category: 'Historical Place',
    name: 'Angkor Wat',
    description: 'Largest religious monument in the world, UNESCO site.',
    location: { latitude: 13.4125, longitude: 103.8667 },
    images: ['https://cdn.britannica.com/56/122156-050-F5B469C8/overview-complex-Angkor-Wat-Cambodia.jpg'], 
    link: 'https://en.wikipedia.org/wiki/Angkor_Wat'
  },
  {
    province: 'Siem Reap',
    category: 'Historical Place',
    name: 'Kbal Spean',
    description: 'Digital riverbed carved with Hindu sculptures ("Valley of 1000 Lingas").',
    location: { latitude: 13.6, longitude: 103.9 },
    images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/65/4f/6e/caption.jpg?w=800&h=400&s=1'],
    link: 'https://en.wikipedia.org/wiki/Kbal_Spean'
  },
    {
    province: 'Siem Reap',
    category: 'Historical Place',
    name: 'Angkor Eye',
    description: 'Digital riverbed carved with Hindu sculptures ("Valley of 1000 Lingas").',
    location: { latitude: 13.6, longitude: 103.9 },
    images: ['https://www.khmertimeskh.com/wp-content/uploads/2021/12/30530.jpg'],
    link: 'https://en.wikipedia.org/wiki/Kbal_Spean'
  },
  {
    province: 'Siem Reap',
    category: 'Best Food',
    name: 'Chanrey Tree',
    description: 'Authentic Khmer cuisine in a beautiful setting.',
    location: { latitude: 13.3575, longitude: 103.8597 },
    images: [],
    link: ''
  },
  // Battambang
  {
    province: 'Battambang',
    category: 'Historical Place',
    name: 'Phnom Banan',
    description: 'Angkor-style temple atop hill—climb 358 steps for views.',
    location: { latitude: 13.038, longitude: 103.132 },
    images: ['https://www.siemreap.net/wp-content/uploads/2023/05/Butterfly-Pea-Restaurant.jpeg'],
    link: ''
  },
  {
    province: 'Battambang',
    category: 'Historical Place',
    name: 'Wat Ek Phnom',
    description: '11th-century Angkorian temple with detailed lintels.',
    location: { latitude: 13.18, longitude: 103.02 },
    images: [],
    link: 'https://en.wikipedia.org/wiki/Wat_Ek_Phnom'
  },
  {
    province: 'Battambang',
    category: 'Best Food',
    name: 'Phare Ponleu Selpak Circus',
    description: 'Circus combining traditional and contemporary Khmer performing arts.',
    location: { latitude: 13.100, longitude: 103.2 },
    images: ['https://www.vivutravel.com/images/des-cambodia1/cambodia-tour-battambang.jpg'],
    link: ''
  },
  // Kampong Thom
  {
    province: 'Kampong Thom',
    category: 'Historical Place',
    name: 'Sambor Prei Kuk',
    description: 'Pre-Angkorian archaeological site, UNESCO World Heritage.',
    location: { latitude: 12.966, longitude: 104.58 },
    images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/d1/db/ce/temple-at-sambour-prei.jpg?w=900&h=500&s=1'],
    link: 'https://en.wikipedia.org/wiki/Sambor_Prei_Kuk'
  },
  {
    province: 'Kampong Thom',
    category: 'Historical Place',
    name: 'Phnom Santuk',
    description: 'Sacred hill with shrines, reclining Buddha, and scenic views.',
    location: { latitude: 12.6333, longitude: 104.85 },
    images: ['https://st5.depositphotos.com/3531125/64392/i/450/depositphotos_643926080-stock-photo-wat-lak-city-phrachuap-khiri.jpg'],
    link: 'https://en.wikipedia.org/wiki/Phnom_Santuk'
  },
  // Kratie
  {
    province: 'Kratie',
    category: 'Historical Place',
    name: 'Irrawaddy Dolphins at Mekong',
    description: 'Rare freshwater dolphins seen near Kratie province rivers.',
    location: { latitude: 13.449, longitude: 106.0 },
    images: ['https://tourismcambodia.org/storage/uploads/category_banner/ministry-of-tourism-cambodia-2021-06-13-03-53-52pm.jpg'],
    link: ''
  },
  // Phnom Penh
  {
    province: 'Phnom Penh',
    category: 'Historical Place',
    name: 'Royal Palace and Silver Pagoda',
    description: 'Royal Royal complex with beautiful Khmer architecture and Silver Pagoda.',
    location: { latitude: 11.55, longitude: 104.9167 },
    images: ['https://media.istockphoto.com/id/1311152742/photo/the-royal-palace-phnom-penh-cambodia.jpg?s=612x612&w=0&k=20&c=hT4jCkfsBNHN0ebWoOw5Pv_x1BmKHVPgk9ampyda_04='],
    link: ''
  },
  {
    province: 'Phnom Penh',
    category: 'Historical Place',
    name: 'Tuol Sleng Genocide Museum',
    description: 'Museum remembering the victims of the Khmer Rouge regime.',
    location: { latitude: 11.5690, longitude: 104.9175 },
    images: ['https://www.cipdh.gob.ar/memorias-situadas/wp-content/uploads/2019/03/11958426624_39e0e2321c_o.jpg'],
    link: ''
  },
];

// ---------- Seed function ----------
async function seedDB() {
  await mongoose.connect(config.mongodb_uri);
  console.log('◼ Connected to MongoDB');

  await Province.deleteMany();
  await Category.deleteMany();
  await Place.deleteMany();

  const provs = await Province.insertMany(provinces);
  const cats = await Category.insertMany(categories);

  const placeDocs = places.map(p => ({
    province: provs.find(x => x.name === p.province)._id,
    category: cats.find(x => x.name === p.category)._id,
    name: p.name,
    description: p.description,
    location: p.location,
    images: p.images,
    link: p.link,
  }));

  await Place.insertMany(placeDocs);

  console.log('✓ Seed complete!');
  mongoose.disconnect();
}

seedDB().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
