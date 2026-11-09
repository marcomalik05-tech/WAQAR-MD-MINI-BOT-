// ============================================
// 🌸 CHANNEL COMMANDS - §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 💖 Boys Power Mode: ON
// ============================================

const { waqar } = require('../waqar');

function boyBox(title, rows) {
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

// Stylized characters for channel reaction
const stylizedChars = {
    a: '🅰', b: '🅱', c: '🅲', d: '🅳', e: '🅴', f: '🅵',
    g: '🅶', h: '🅷', i: '🅸', j: '🅹', k: '🅺', l: '🅻',
    m: '🅼', n: '🅽', o: '🅾', p: '🅿', q: '🆀', r: '🆁',
    s: '🆂', t: '🆃', u: '🆄', v: '🆅', w: '🆆', x: '🆇',
    y: '🆈', z: '🆉',
    '0': '⓿', '1': '❶', '2': '❷', '3': '❸', '4': '❹',
    '5': '❺', '6': '❻', '7': '❼', '8': '❽', '9': '❾'
};

// Channel React
waqar({
    pattern: "chreact",
    alias: ["channelreact"],
    desc: "🌸 React to channel message with stylized text",
    category: "owner",
    react: "🌸",
    filename: __filename
}, async (waqar, mek, m, { from, q, isOwner, isCreator, reply }) => {
    try {
        if (!isOwner && !isCreator) return reply(`🌸 Only my waqar writes can use this! 👑💖`);

        if (!q) return reply(`🌸 Usage: .chr https://whatsapp.com/channel/xxxxx/yyyy hello 💕`);

        const [link, ...textParts] = q.split(' ');
        if (!link.includes("whatsapp.com/channel/")) {
            return reply("🌸 Invalid channel link! 💕");
        }

        const inputText = textParts.join(' ').toLowerCase();
        if (!inputText) return reply("🌸 Please provide text to convert! 💕");

        const emoji = inputText
            .split('')
            .map(char => char === ' ' ? '—' : stylizedChars[char] || char)
            .join('');

        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];
        if (!channelId || !messageId) return reply("🌸 Invalid link - missing IDs! 💕");

        const channelMeta = await waqar.newsletterMetadata("invite", channelId);
        await waqar.newsletterReactMessage(channelMeta.id, messageId, emoji);

        reply(girlBox('🔤 CHANNEL REACTION', [
            ['✅', 'Status', 'Reaction sent'],
            ['📢', 'Channel', channelMeta.name],
            ['🔤', 'Reaction', emoji]
        ]));

    } catch (e) {
        console.error(e);
        reply(`🌸 Error: ${e.message || "Failed to send reaction"} 💕`);
    }
});

// Channel ID
waqar({
    pattern: "cid",
    alias: ["channelid", "cinfo"],
    desc: "🌸 Get channel info from link",
    category: "utility",
    react: "🌸",
    filename: __filename
}, async (waqar, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply(`🌸 Provide channel link!\nExample: .cid https://whatsapp.com/channel/xxxxx 💕`);

        const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
        if (!match) return reply("🌸 Invalid channel link! 💕");

        const inviteId = match[1];
        const metadata = await waqar.newsletterMetadata("invite", inviteId);

        if (!metadata || !metadata.id) return reply("🌸 Channel not found! 💕");

        reply(boyBox('📢 CHANNEL INFO', [
            ['🆔', 'ID', metadata.id],
            ['📌', 'Name', metadata.name],
            ['👥', 'Followers', metadata.subscribers?.toLocaleString() || 'N/A'],
            ['📅', 'Created', metadata.creation_time ? new Date(metadata.creation_time * 1000).toLocaleString() : 'Unknown']
        ]));

    } catch (error) {
        console.error("🌸 Channel ID Error:", error);
        reply(`🌸 Error: ${error.message} 💕`);
    }
});

console.log('🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 - Channel plugins loaded! 💖');
