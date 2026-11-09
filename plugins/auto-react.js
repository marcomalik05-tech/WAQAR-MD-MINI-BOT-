// ============================================
// 🌸 AUTO REACT - §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 💖 BOYS Power Mode: ON
// ============================================

const { waqar } = require('../waqar');
const config = require('../config');
const fs = require('fs');
const path = require('path');

function girlBox(title, rows) {
    const body = rows.map(([emoji, label, value]) => 
        `│  ✿ ${emoji} ${label}: ${value || ''}`
    ).join('\n');
    return `
╭────────────────────◇
│  ✿ ${title} ✿
│  ✌︎㋡━━━━━━━━━✌︎㋡
${body}
╰────────────────────○

> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
`;
}

const autoReactPath = path.join(__dirname, '../data/autoreact.json');
const defaultConfig = { enabled: false, emojis: ['🌸', '💖', '✨', '🎀', '💕'] };

function loadConfig() {
    try {
        if (fs.existsSync(autoReactPath)) {
            return JSON.parse(fs.readFileSync(autoReactPath, 'utf-8'));
        }
        return { ...defaultConfig };
    } catch { return { ...defaultConfig }; }
}

function saveConfig(config) {
    try {
        fs.writeFileSync(autoReactPath, JSON.stringify(config, null, 2));
        return true;
    } catch { return false; }
}

waqar({
    pattern: "autoreact",
    alias: ["ar", "reactauto"],
    desc: "🌸 Toggle auto react",
    category: "settings",
    react: "🌸",
    filename: __filename
}, async (waqar, mek, m, { from, args, isOwner, isCreator, reply }) => {
    try {
        if (!isOwner && !isCreator) return reply(`🌸 Only my waqar writes can use this! 👑💖`);

        const config = loadConfig();
        const action = (args[0] || '').toLowerCase();

        if (action === 'on') {
            config.enabled = true;
            saveConfig(config);
            return reply(girlBox('🌸 AUTO REACT', [
                ['✅', 'Status', 'ENABLED'],
                ['🎭', 'Emojis', config.emojis.join(', ')]
            ]));
        }

        if (action === 'off') {
            config.enabled = false;
            saveConfig(config);
            return reply(girlBox('🌸 AUTO REACT', [
                ['❌', 'Status', 'DISABLED']
            ]));
        }

        const status = config.enabled ? '🟢 ENABLED' : '🔴 DISABLED';
        reply(girlBox('🌸 AUTO REACT STATUS', [
            ['📊', 'Status', status],
            ['🎭', 'Emojis', config.emojis.join(', ')],
            ['📌', 'Usage', '.autoreact on/off']
        ]));

    } catch (e) {
        console.error("🌸 Auto React Error:", e);
        reply(`🌸 Error: ${e.message} 💕`);
    }
});

// Auto React Detector
waqar({
    on: "body"
}, async (waqar, mek, m, { from }) => {
    try {
        const config = loadConfig();
        if (!config.enabled) return;
        if (mek.key?.fromMe) return;

        const emojis = config.emojis || defaultConfig.emojis;
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        await waqar.sendMessage(from, {
            react: { text: randomEmoji, key: mek.key }
        });

    } catch (e) {
        // Silent fail for auto react
    }
});

console.log('🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 - Auto React plugin loaded! 💖');
