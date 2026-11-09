// ============================================
// 🌸 §࿐ 𝗛𝗔𝗙𝗜𝗭 𝗪𝗔𝗤𝗔𝗥 𝗔𝗧𝗧𝗔𝗥𝗜 𝗤𝗔𝗗𝗥𝗜 ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻I ANTI-CALL
// 👑 Developer: MARCO MALIK-MD
// 🔥 Enable/Disable auto call rejection
// ============================================

const { waqar } = require('../waqar');
const config = require('../settings');
const { girlBox, girlHelp, girlSuccess, girlError } = require('../lib/style');

// ============================================
// 📌 ANTI-CALL COMMAND
// ============================================

waqar({
    pattern: "anticall",
    react: "📵",
    alias: ["anti-call", "callblock", "rejectcall"],
    desc: "🌸 Enable or disable auto call rejection",
    category: "owner",
    filename: __filename
}, async (waqar, mek, m, { from, args, isOwner, isCreator, reply }) => {
    try {
        // ── Only Owner ──
        if (!isOwner && !isCreator) {
            return reply(`🌸 Only my Waqar Warits can use this!👑💖`);
        }

        const status = args[0]?.toLowerCase();

        // ── Show Current Status ──
        if (!status || status === 'status') {
            const currentStatus = config.ANTI_CALL === 'true' ? '🟢 ENABLED' : '🔴 DISABLED';
            return reply(girlBox('📵 Aɴᴛɪ-Cᴀʟʟ Sᴛᴀᴛᴜs', [
                ['📊', 'Status', currentStatus],
                ['📌', 'To Enable', '.anticall on'],
                ['📌', 'To Disable', '.anticall off'],
                ['💡', 'Note', 'All incoming calls will be rejected'],
                ['👑', 'By', 'WAQAR WRITES']
            ]));
        }

        // ── Enable ──
        if (status === 'on' || status === 'enable' || status === 'true') {
            config.ANTI_CALL = 'true';
            // Save to settings
            try {
                const fs = require('fs');
                const settingsPath = path.join(__dirname, '../settings.js');
                const settingsContent = fs.readFileSync(settingsPath, 'utf8');
                const updatedContent = settingsContent.replace(
                    /ANTI_CALL: ['"]?(true|false)['"]?/,
                    `ANTI_CALL: 'true'`
                );
                fs.writeFileSync(settingsPath, updatedContent);
            } catch (e) {
                console.error('[AntiCall] Save error:', e.message);
            }

            return reply(girlSuccess('✅ Anti-Call enabled! All calls will be rejected.'));
        }

        // ── Disable ──
        if (status === 'off' || status === 'disable' || status === 'false') {
            config.ANTI_CALL = 'false';
            // Save to settings
            try {
                const fs = require('fs');
                const settingsPath = path.join(__dirname, '../settings.js');
                const settingsContent = fs.readFileSync(settingsPath, 'utf8');
                const updatedContent = settingsContent.replace(
                    /ANTI_CALL: ['"]?(true|false)['"]?/,
                    `ANTI_CALL: 'false'`
                );
                fs.writeFileSync(settingsPath, updatedContent);
            } catch (e) {
                console.error('[AntiCall] Save error:', e.message);
            }

            return reply(girlSuccess('❌ Anti-Call disabled! Calls will not be rejected.'));
        }

        // ── Invalid ──
        return reply(girlHelp('📵 Aɴᴛɪ-Cᴀʟʟ', [
            ['📌', 'Usage', '.anticall <on/off/status>'],
            ['💖', 'Enable', '.anticall on'],
            ['💖', 'Disable', '.anticall off'],
            ['📊', 'Status', '.anticall status'],
            ['👑', 'By', 'WAQAR WRITES']
        ]));

    } catch (error) {
        console.error('[AntiCall] Error:', error.message);
        reply(girlError(error.message));
        await waqar.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
});

console.log('🌸 ANTI-CALL command loaded! 💖');
