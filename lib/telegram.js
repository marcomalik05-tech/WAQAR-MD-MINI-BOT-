// Telegram notifications. Token comes ONLY from environment variables.
const TelegramBot = require('node-telegram-bot-api');
let bot = null;

function getBot() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) return null;
    if (!bot) bot = new TelegramBot(token, { polling: false });
    return bot;
}

async function notify(text) {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const b = getBot();
    if (!b || !chatId) return;
    try { await b.sendMessage(chatId, text); }
    catch (e) { console.error('[Telegram] send failed:', e.message); }
}

module.exports = { notify };
