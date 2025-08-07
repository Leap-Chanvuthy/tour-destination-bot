require('dotenv').config();

module.exports = {
  telgram_bot_token: process.env.TELEGRAM_BOT_TOKEN || '',
};
