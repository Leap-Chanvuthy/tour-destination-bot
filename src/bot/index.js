// src/bot/index.js
const { Telegraf } = require('telegraf');
const config = require('../config');

const startCommand = require('./commands/start');
const provinceSelected = require('./callbacks/provinceSelected');
const categorySelected = require('./callbacks/categorySelected');

const bot = new Telegraf(config.telegram_bot_token);

bot.start(startCommand);
bot.action(/province_.+/, provinceSelected);
bot.action(/category_.+/, categorySelected);

bot.launch();

console.log('🚀 Bot is running...');

module.exports = bot;
