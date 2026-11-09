// ============================================
// 🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 - STYLE HELPER
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 🔥 Consistent styling across all plugins
// ============================================

const config = require('../settings');

/**
 * 🦁 Boy Style Box
 * @param {string} title - Box title
 * @param {Array} rows - Array of [emoji, label, value]
 * @param {string} footer - Custom footer (optional)
 * @returns {string} Formatted message
 */
function girlBox(title, rows, footer = null) {
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
`.trim();
}

/**
 * 🎀 Girl Style Box - Alternative
 */
function girlBoxAlt(title, rows) {
    const body = rows.map(([emoji, label, value]) => 
        `│  ✿ ${emoji} ${label}: ${value || ''}`
    ).join('\n');
    
    return `
╭────────────────────◇
│ 💕⃝🕊️ ${title} 💕⃝🕊️
│  ✿━━━━━━━━━━━━━━━✿
${body}
╰────────────────────○

> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙࿐
`.trim();
}

/**
 * 🎀 Simple Message with Style
 */
function girlMessage(text, title = null) {
    const titleLine = title ? `│  ✿ ${title} ✿\n│  ✌︎㋡━━━━━━━━━✌︎㋡\n` : '';
    return `
╭────────────────────◇
${titleLine}${text.split('\n').map(line => `│  ✿ ${line}`).join('\n')}
╰────────────────────○

> 🦋⃟ 𝙈𝙄𝙎𝙃𝙐 𝙌𝙐𝙀𝙀𝙉 𝙈𝙄𝙉𝙄 🦋⃟‌💙
`.trim();
}

/**
 * 🎀 Success Message
 */
function girlSuccess(message) {
    return girlMessage(`✅ ${message}`, '✅ Sᴜᴄᴄᴇss');
}

/**
 * 🎀 Error Message
 */
function girlError(message) {
    return girlMessage(`❌ ${message}`, '❌ Eʀʀᴏʀ');
}

/**
 * 🎀 Warning Message
 */
function girlWarning(message) {
    return girlMessage(`⚠️ ${message}`, '⚠️ Wᴀʀɴɪɴɢ');
}

/**
 * 🎀 Info Message
 */
function girlInfo(message) {
    return girlMessage(`📌 ${message}`, '📌 Iɴғᴏ');
}

/**
 * 🎀 Help Message
 */
function girlHelp(title, rows) {
    const body = rows.map(([emoji, label, value]) => 
        `│  ✿ ${emoji} ${label}: ${value || ''}`
    ).join('\n');
    
    return `
╭────────────────────◇
│  ✿ ${title} ✿
│  ✌︎㋡━━━━━━━━━✌︎㋡
${body}
╰────────────────────○

> 🦋⃟ §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🦋⃟‌💙
`.trim();
}

module.exports = {
    boyBox,
    boyBoxAlt,
    boyMessage,
    boySuccess,
    boyError,
    boyWarning,
    boyInfo,
    boyHelp
};
