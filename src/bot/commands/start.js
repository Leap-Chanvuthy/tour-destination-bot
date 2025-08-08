// src/bot/commands/start.js
const Province = require('../../models/provinceModel');

module.exports = async (ctx) => {
  const provinces = await Province.find().sort({ name: 1 });

  if (!provinces.length) {
    return ctx.reply('Sorry, no provinces found.');
  }

  const buttons = provinces.map((p) => [{ text: p.name, callback_data: `province_${p._id}` }]);

  await ctx.reply('Please choose a province for your trip:', {
    reply_markup: {
      inline_keyboard: buttons,
    },
  });
};
