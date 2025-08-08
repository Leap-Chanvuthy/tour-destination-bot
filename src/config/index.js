require('dotenv').config();

module.exports = {
  port : process.env.PORT || 4000,
  telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN || '',
  mongodb_uri: process.env.MONGODB_URI || '',
};
