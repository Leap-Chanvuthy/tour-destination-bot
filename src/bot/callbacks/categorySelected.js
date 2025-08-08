const Category = require('../../models/categoryModel');
const Place = require('../../models/placeModel');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async (ctx) => {
  try {
    const callbackData = ctx.callbackQuery.data;
    const [_, provinceId, categoryId] = callbackData.split('_');

    const places = await Place.find({ province: provinceId, category: categoryId }).limit(5);

    if (!places.length) {
      await ctx.answerCbQuery('No places found for this category.');
      return;
    }

    for (const place of places) {
      await ctx.replyWithPhoto(
        { url: place.images?.[0] || '' },
        {
          caption: `*${place.name}*\n${place.description || 'No description available.'}\n${place.link ? `[More info](${place.link})` : ''}`,
          parse_mode: 'Markdown',
        }
      );
      await delay(500);
    }

    const categories = await Category.find().sort({ name: 1 });
    if (!categories.length) return;

    const allButtons = categories.map((c) => ({
      text: `${c.icon || ''} ${c.name}`,
      callback_data: `category_${provinceId}_${c._id}`
    }));

    const buttons = [];
    for (let i = 0; i < allButtons.length; i += 4) {
      buttons.push(allButtons.slice(i, i + 4));
    }

    await ctx.editMessageText('Choose a category:', {
      reply_markup: { inline_keyboard: buttons },
    });

    await ctx.answerCbQuery();
  } catch (error) {
    console.error('Error in categorySelected handler:', error);
    await ctx.reply('Sorry, something went wrong. Please try again.');
  }
};
