// ============================================
// 🌸 JID - §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 💖 Boys Power Mode: ON
// ============================================

const { waqar } = require('../waqar');

waqar({
    pattern: "jid",
    alias: ["id", "chatid", "gjid"],
    desc: "🌸 Get full JID of current chat (Waqar writes Only)",
    category: "owner",
    react: "🌸",
    filename: __filename
}, async (waqar, mek, m, { from, isGroup, isOwner, isCreator, reply, sender }) => {
    try {
        if (!isOwner && !isCreator) {
            return reply(`🌸 Only my Waqar writes can use this! 🦁💖`);
        }

        if (isGroup) {
            return reply(`👥 *Group JID:*\n\`\`\`${from}\`\`\``);
        } else {
            return reply(`👤 *User JID:*\n\`\`\`${sender}\`\`\``);
        }

    } catch (e) {
        console.error("🌸 JID Error:", e);
        reply(`⚠️ Error: ${e.message}`);
    }
});

console.log('🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 - JID plugin loaded! 💖');
