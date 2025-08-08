// src/bot/callbacks/provinceSelected.js
const Category = require('../../models/categoryModel');

module.exports = async (ctx) => {
  const callbackData = ctx.callbackQuery.data; // e.g. 'province_<id>'
  const provinceId = callbackData.split('_')[1];

  const categories = await Category.find().sort({ name: 1 });
  if (!categories.length) return ctx.reply('No categories available.');

  // Create buttons array with all category buttons
  const allButtons = categories.map((c) => ({
    text: `${c.icon || ''} ${c.name}`,
    callback_data: `category_${provinceId}_${c._id}`
  }));

  // Group buttons into rows of 4
  const buttons = [];
  for (let i = 0; i < allButtons.length; i += 4) {
    buttons.push(allButtons.slice(i, i + 4));
  }

  await ctx.editMessageText('Choose a category:', {
    reply_markup: { inline_keyboard: buttons },
  });
};
