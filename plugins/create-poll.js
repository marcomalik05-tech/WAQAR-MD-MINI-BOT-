// ============================================
// 🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 - POLL COMMAND
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 💖 BOY Power Mode: ON
// 📌 Converted from your friend's bot
// ============================================

const { waqar } = require('../waqar');
const config = require('../config');

waqar({
    pattern: "poll",
    alias: ["createpoll", "vote"],
    desc: "🌸 Create a poll in the group",
    category: "group",
    react: "🌸",
    filename: __filename
}, async (waqar, mek, m, {
    from,
    isGroup,
    isAdmins,
    isOwner,
    isCreator,
    text,
    reply
}) => {
    try {
        if (!isGroup) return reply("🌸 This command only works in groups! 💕");
        if (!isAdmins && !isOwner && !isCreator) return reply("🌸 Only admins and waqar writes can create polls! 🦁💖");

        if (!text) {
            return reply(`🌸 Usage: .poll question;option1,option2,option3...\n\nExample: .poll Best Color?;Red,Blue,Green 💕`);
        }

        const [question, optionsString] = text.split(";");
        
        if (!question || !optionsString) {
            return reply(`🌸 Please provide question and options!\n\nExample: .poll Best Color?;Red,Blue,Green 💕`);
        }

        const options = optionsString.split(",").map(o => o.trim()).filter(o => o);

        if (options.length < 2) {
            return reply("🌸 Please provide at least two options! 💕");
        }

        await waqar.sendMessage(from, {
            poll: {
                name: question,
                values: options,
                selectableCount: 1,
                toAnnouncementGroup: true,
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("🌸 Poll Error:", e);
        reply(`🌸 Error: ${e.message} 💕`);
    }
});
